require IEx
defmodule Treelib.PhotoManager.PhotoUpdaterTest do
  use Treelib.DataCase
  alias Treelib.PhotoManager.PhotoUpdater
  alias Treelib.PhotoManager.PhotoAlbum

  import Treelib.Factory

  setup do
    ###################################
    #
    # OK: PhotoAlbum that doesn't need to be modified
    # (Flickr response's date_update is the same)
    ok_attrs = %{photoset_id: 72157677069967095, name: "okay tree", last_updated: Timex.now}
    pa_ok = insert(:photo_album, ok_attrs) 

    # UPDATE: PhotoAlbum that should be updated
    # (Flickr response's date_update is more recent)
    update_attrs = %{photoset_id: 72157673092712473, name: "update tree", last_updated: Timex.shift(Timex.now, days: -1)}
    pa_update = insert(:photo_album, update_attrs) 

    # DELETE: PhotoAlbum that should be deleted
    # (in the db, but not in the Flickr response)
    delete_attrs = %{photoset_id: 123456, name: "delete tree", last_updated: Timex.shift(Timex.now, days: -1)}
    pa_delete = insert(:photo_album, delete_attrs) 

    photo_albums = [pa_ok, pa_update, pa_delete]

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
          %{
            "can_comment" => 0,
            "count_comments" => "0",
            "count_views" => "6",
            "date_create" => "1480120977",
            "date_update" => "1481058523",
            "description" => %{"_content" => ""},
            "farm" => 6,
            "id" => "72157677069967095",
            "needs_interstitial" => 0,
            "photos" => 15,
            "primary" => "30873961770",
            "secret" => "f71e1d46e9",
            "server" => "5601",
            "title" => %{"_content" => "Araucaria araucana "},
            "videos" => 0,
            "visibility_can_see_set" => 1},
          %{
            "can_comment" => 0,
            "count_comments" => "0",
            "count_views" => "0",
            "date_create" => "1480121126",
            "date_update" => "1481058523",
            "description" => %{"_content" => ""},
            "farm" => 6,
            "id" => "72157673092712473",
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

    %{ "photosets" => %{"photoset" => photosets}} = flickr_pa_response 

    {:ok, %{photo_albums: photo_albums, photosets: photosets}}
  end

  describe "album_ids_to_delete" do
    test "it returns any PhotoAlbums that should be deleted", %{photo_albums: photo_albums, photosets: photosets}  do
      assert PhotoUpdater.album_ids_to_delete(photo_albums, photosets) == [123456]
    end
  end

end
