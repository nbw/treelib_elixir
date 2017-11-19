defmodule Treelib.PhotoManager.PhotoUpdaterTest do
  use Treelib.DataCase
  alias Treelib.PhotoManager.PhotoUpdater
  alias Treelib.PhotoManager.Photo
  alias Treelib.PhotoManager.PhotoAlbum
  alias Treelib.PhotoManager

  import Ecto.Query, warn: false

  import Treelib.Factory

  @flickr Application.get_env(:treelib, :flickr_api)

  setup do
    ###################################
    #
    # OK: PhotoAlbum that doesn't need to be modified
    # (Flickr response's date_update is the same)
    ok_date = Timex.now
    ok_attrs = %{photoset_id: 72157677069967095, name: "okay tree", last_updated: ok_date}
    pa_ok = insert(:photo_album, ok_attrs) 

    # UPDATE: PhotoAlbum that should be updated
    # (Flickr response's date_update is more recent)
    update_date = Timex.now
    update_attrs = %{photoset_id: 72157673092712473, name: "update tree", last_updated: update_date}
    pa_update = insert(:photo_album, update_attrs) 
    ph_update_attrs = %{photoset_id: 72157673092712473}
    ph_update = insert(:photo, ph_update_attrs) 

    # DELETE: PhotoAlbum that should be deleted
    # (in the db, but not in the Flickr response)
    pa_delete_attrs = %{photoset_id: 123456, name: "delete tree", last_updated: Timex.shift(Timex.now, days: -1)}
    pa_delete = insert(:photo_album, pa_delete_attrs) 

    # DELETE: Photo that should be deleted
    ph_delete_attrs = %{photoset_id: 123456}
    ph_delete = insert(:photo, ph_delete_attrs) 

    # DELETE: Photo #2 that should be deleted
    ph_delete_attrs_2 = %{photoset_id: 123456}
    ph_delete_2 = insert(:photo, ph_delete_attrs_2) 

    photo_albums = [pa_ok, pa_update, pa_delete]
    photos = [ph_update, ph_delete, ph_delete_2]

    ###################################
    #
    # FLICKR Photoset Response
    # 
    # Contains:
    #   1. OK: photoset that should be the same as the db
    #   2. UPDATE: photoset that should be newer the db
    #   3. NEW: photoset that isn't in the db
    photosets = @flickr.get_photosets(%{ok_date: ok_date, update_date: update_date}) 
                |> @flickr.parse_photosets_resp 

    # deletable_photos = @flickr.get_photos_in_photoset(

    {:ok, %{photo_albums: photo_albums, photosets: photosets, photos: photos}}
  end

  describe "album_ids_to_delete" do
    test "it returns any PhotoAlbums that should be deleted", %{photo_albums: photo_albums, photosets: photosets}  do
      assert PhotoUpdater.album_ids_to_delete(photo_albums, photosets) == [123456]
    end
  end

  describe "albums_to_create" do
    test "it returns any PhotoAlbums that should be created", %{photo_albums: photo_albums, photosets: photosets}  do
      new_photoset = Enum.find(photosets, &( &1.id == 7777 ))
      new_photoset_2 = Enum.find(photosets, &( &1.id == 8888 ))
      
      albums_to_create = PhotoUpdater.albums_to_create(photo_albums, photosets)

      assert Enum.member?(albums_to_create, new_photoset)
      assert Enum.member?(albums_to_create, new_photoset_2)
      assert Kernel.length(albums_to_create) == 2 
    end
  end

  describe "albums_to_update" do
    test "it returns any PhotoAlbums that should be updated", %{photo_albums: photo_albums, photosets: photosets}  do
      update_photoset = Enum.find(photosets, &( &1.id == 72157673092712473 ))
      update_photo_album = Enum.find(photo_albums, &( &1.photoset_id == 72157673092712473 ))

      assert PhotoUpdater.albums_to_update(photo_albums, photosets) == [[update_photo_album, update_photoset]]
    end
  end

  describe "process_deletes" do
    test "deletes albums that are in the db, but not on flickr", %{photo_albums: photo_albums, photosets: photosets}  do
      deleted_album = Treelib.Repo.get_by!(PhotoAlbum, photoset_id: 123456)

      PhotoUpdater.process_deletes(photo_albums, photosets)  

      albums = PhotoManager.list_albums

      assert Enum.member?(albums, deleted_album) == false 
    end

    test "deletes all photos of deleted albums too", %{photo_albums: photo_albums, photosets: photosets, photos: photos}  do
      deleted_photos = Photo|> where([p], p.photoset_id in [123456]) |> Treelib.Repo.all

      PhotoUpdater.process_deletes(photo_albums, photosets)  

      photos = PhotoManager.list_photos

      Enum.each(deleted_photos, fn(p) ->
        assert Enum.member?(photos, p) == false 
      end)
    end
  end

  describe "process_creates" do
    test "it does creates albums from flickr, that aren't in the db", %{photo_albums: photo_albums, photosets: photosets}  do

      # verify it doesn't exist yet
      non_existing_new_album = Treelib.Repo.get_by(PhotoAlbum, photoset_id: 7777 )
      non_existing_new_album_2 = Treelib.Repo.get_by(PhotoAlbum, photoset_id: 8888 )

      assert non_existing_new_album == nil 
      assert non_existing_new_album_2 == nil 

      PhotoUpdater.process_creates(photo_albums, photosets)  

      albums = PhotoManager.list_albums

      new_album = Treelib.Repo.get_by(PhotoAlbum, photoset_id: 7777 )
      new_album_2 = Treelib.Repo.get_by(PhotoAlbum, photoset_id: 8888 )

      # verify that it's persisted, now.
      assert Enum.member?(albums, new_album) == true 
      assert Enum.member?(albums, new_album_2) == true 
    end

    test "it does creates photos from flickr, from the newly created db", %{photo_albums: photo_albums, photosets: photosets}  do
      PhotoUpdater.process_creates(photo_albums, photosets)  

      photos = PhotoManager.list_photos

      new_photos = Photo |> where([p], p.photoset_id in [7777, 8888]) |> Treelib.Repo.all

      Enum.each(new_photos, fn(p) ->
        assert Enum.member?(photos, p) == true 
      end)
    end
  end

  describe "process_updates" do
    test "it updates albums that are new on flickr", %{photo_albums: photo_albums, photosets: photosets}  do
      before_update = Treelib.Repo.get_by(PhotoAlbum, photoset_id: 72157673092712473 )

      PhotoUpdater.process_updates(photo_albums, photosets)  

      after_update = Treelib.Repo.get_by(PhotoAlbum, photoset_id: 72157673092712473 )

      # check that the dates are different
      assert before_update.last_updated != after_update.last_updated 

      # check that the dates are about 1 hour apart
      assert_in_delta DateTime.diff(after_update.last_updated, before_update.last_updated), 3600, 1.0001
    end

    test "it updates photos for updated albums: by deleting and readding", %{photo_albums: photo_albums, photosets: photosets}  do
      before_update = Photo |> where([p], p.photoset_id in [72157673092712473]) |> Treelib.Repo.all

      PhotoUpdater.process_updates(photo_albums, photosets)  

      new_photos = Photo |> where([p], p.photoset_id in [72157673092712473]) |> Treelib.Repo.all
      photos = PhotoManager.list_photos

      # Check that two photos were added
      assert Kernel.length(new_photos) == 2

      # Check that the photo before update is no longer present
      assert Enum.member?(new_photos, before_update) == false
    end
  end
end
