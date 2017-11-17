require IEx
defmodule Treelib.PhotoManager.PhotoUpdaterTest do
  use Treelib.DataCase
  alias Treelib.PhotoManager.PhotoUpdater
  alias Treelib.PhotoManager.Photo
  alias Treelib.PhotoManager.PhotoAlbum
  alias Treelib.PhotoManager

  import Ecto.Query, warn: false

  import Treelib.Factory

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
    photos = [ph_delete, ph_delete_2]

    ###################################
    #
    # FLICKR Response
    # 
    # Contains:
    #   1. OK: photoset that should be the same as the db
    #   2. UPDATE: photoset that should be newer the db
    #   3. NEW: photoset that isn't in the db
    flickr_pa_response = %{
      "photosets" => %{
        "page" => 1, 
        "pages" => 1, 
        "perpage" => 36,
        "photoset" => [
          %{ # new photoset
            "can_comment" => 0,
            "count_comments" => "0",
            "count_views" => "6",
            "date_create" => "1480120977",
            "date_update" => "1481058523",
            "description" => %{"_content" => ""},
            "farm" => 6,
            "id" => "7777777777777777",
            "needs_interstitial" => 0,
            "photos" => 15,
            "primary" => "30873961770",
            "secret" => "f71e1d46e9",
            "server" => "5601",
            "title" => %{"_content" => "Araucaria araucana "},
            "videos" => 0,
            "visibility_can_see_set" => 1},
          %{ # new photoset
            "can_comment" => 0,
            "count_comments" => "0",
            "count_views" => "6",
            "date_create" => "1480120977",
            "date_update" => "1481058523",
            "description" => %{"_content" => ""},
            "farm" => 6,
            "id" => "88888888888888888",
            "needs_interstitial" => 0,
            "photos" => 15,
            "primary" => "30873961770",
            "secret" => "f71e1d46e9",
            "server" => "5601",
            "title" => %{"_content" => "Araucaria araucana "},
            "videos" => 0,
            "visibility_can_see_set" => 1},
          %{ # photoset to update
            "can_comment" => 0,
            "count_comments" => "0",
            "count_views" => "6",
            "date_create" => "1480120977",
            "date_update" => Integer.to_string(DateTime.to_unix(Timex.shift(update_date, hours: 1))),
            "description" => %{"_content" => ""},
            "farm" => 6,
            "id" => "72157673092712473",
            "needs_interstitial" => 0,
            "photos" => 15,
            "primary" => "30873961770",
            "secret" => "f71e1d46e9",
            "server" => "5601",
            "title" => %{"_content" => "Araucaria araucana "},
            "videos" => 0,
            "visibility_can_see_set" => 1},
          %{ # photoset to leave as is
            "can_comment" => 0,
            "count_comments" => "0",
            "count_views" => "0",
            "date_create" => "1480121126",
            "date_update" => Integer.to_string(DateTime.to_unix(ok_date)),
            "description" => %{"_content" => ""},
            "farm" => 6,
            "id" => "72157677069967095",
            "needs_interstitial" => 0,
            "photos" => 6,
            "primary" => "31097794712",
            "secret" => "fab1da026f",
            "server" => "5578",
            "title" => %{"_content" => "Araucaria heterophylla"},
            "videos" => 0,
            "visibility_can_see_set" => 1}
        ]
      }
    }

    flickr_photo_response = %{
      "photoset" => %{
      "id" => "72157676961718766",
      "owner" => "139437718@N03",
      "ownername" => "wbnathan",
      "page" => 1, "pages" => 1,
      "per_page" => 500,
      "perpage" => 500,
      "photo" => [
        %{
          "farm" => 6,
          "id" => "31091742462",
          "isfamily" => 0,
          "isfriend" => 0,
          "isprimary" => "0",
          "ispublic" => 1,
          "secret" => "3f63cca59a",
          "server" => "5612",
          "title" => "Rhus typhina-12"
        },
        %{
          "farm" => 6,
          "id" => "31199988056",
          "isfamily" => 0,
          "isfriend" => 0,
          "isprimary" => "0",
          "ispublic" => 1,
          "secret" => "118a651a21",
          "server" => "5801",
          "title" => "Rhus typhina-13"
        }
      ],
      "primary" => "30414648384",
      "title" => "Rhus typhina",
      "total" => "24"
      },
      "stat" => "ok"
    }


    # %{ "photosets" => %{"photoset" => photosets}} = flickr_pa_response 
    photosets = Flickr.API.parse_photosets_resp(flickr_pa_response)

    {:ok, %{photo_albums: photo_albums, photosets: photosets, photos: photos}}
  end

  describe "album_ids_to_delete" do
    test "it returns any PhotoAlbums that should be deleted", %{photo_albums: photo_albums, photosets: photosets}  do
      assert PhotoUpdater.album_ids_to_delete(photo_albums, photosets) == [123456]
    end
  end

  describe "albums_to_create" do
    test "it returns any PhotoAlbums that should be created", %{photo_albums: photo_albums, photosets: photosets}  do
      new_photoset = Enum.find(photosets, &( &1.id == 7777777777777777 ))
      new_photoset_2 = Enum.find(photosets, &( &1.id == 88888888888888888 ))
      
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

      PhotoUpdater.process(photo_albums, photosets)  

      albums = PhotoManager.list_albums

      assert Enum.member?(albums, deleted_album) == false 
    end

    test "deletes all photos of deleted albums too", %{photo_albums: photo_albums, photosets: photosets, photos: photos}  do
      deleted_photos = Photo|> where([p], p.photoset_id in [123456]) |> Treelib.Repo.all

      PhotoUpdater.process(photo_albums, photosets)  

      photos = PhotoManager.list_photos

      Enum.each(deleted_photos, fn(p) ->
        assert Enum.member?(photos, p) == false 
      end)
    end
  end

  describe "process" do
    test "it does creates albums from flickr, that aren't in the db", %{photo_albums: photo_albums, photosets: photosets}  do

      # verify it doesn't exist yet
      non_existing_new_album = Treelib.Repo.get_by(PhotoAlbum, photoset_id: 7777777777777777 )
      non_existing_new_album_2 = Treelib.Repo.get_by(PhotoAlbum, photoset_id: 88888888888888888 )

      assert non_existing_new_album == nil 
      assert non_existing_new_album_2 == nil 

      PhotoUpdater.process(photo_albums, photosets)  

      albums = PhotoManager.list_albums

      new_album = Treelib.Repo.get_by(PhotoAlbum, photoset_id: 7777777777777777 )
      new_album_2 = Treelib.Repo.get_by(PhotoAlbum, photoset_id: 88888888888888888 )

      # verify that it's persisted, now.
      assert Enum.member?(albums, new_album) == true 
      assert Enum.member?(albums, new_album_2) == true 
    end

    test "it updates albums that are new on flickr", %{photo_albums: photo_albums, photosets: photosets}  do
      before_update = Treelib.Repo.get_by(PhotoAlbum, photoset_id: 72157673092712473 )

      PhotoUpdater.process(photo_albums, photosets)  

      after_update = Treelib.Repo.get_by(PhotoAlbum, photoset_id: 72157673092712473 )

      # check that the dates are different
      assert before_update.last_updated != after_update.last_updated 

      # check that the dates are about 1 hour apart
      assert_in_delta DateTime.diff(after_update.last_updated, before_update.last_updated), 3600, 1.0001
    end
  end
end
