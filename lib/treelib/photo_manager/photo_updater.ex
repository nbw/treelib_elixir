defmodule Treelib.PhotoManager.PhotoUpdater do
  @moduledoc """
  Manages syncing between Flickr and DB
  """

  import Treelib.Repo, only: [transaction: 1]

  alias Treelib.PhotoManager
  alias Treelib.PhotoManager.PhotoUpdater

  @flickr Application.get_env(:treelib, :flickr_api)

  @doc """
  Delete, Updates, and Creates for all PhotoAlbums/Photosets
  """
  def process_all do
    photo_albums = PhotoManager.list_albums
    photosets = @flickr.get_all_photosets
    PhotoUpdater.process(photo_albums, photosets)
  end

  @doc """
  Delete, Updates, and Creates in a transaction

  @param pas [List] of %PhotoAlbum{}
  @param pss [List] of %Photoset{}
  """
  def process pas, pss do
    transaction(fn ->
      IO.puts("[ Deletes ]:")
      PhotoUpdater.process_deletes(pas,pss)

      IO.puts("[ Updates ]:")
      PhotoUpdater.process_updates(pas,pss)

      IO.puts("[ Creates ]:")
      PhotoUpdater.process_creates(pas,pss)
    end)
      IO.puts("[ Done ]:")
  end


  @doc """
  Find albums to delete, and deletes them
  -- deletes their photos too!

  @param pas [List] of %PhotoAlbum{}
  @param pss [List] of %Photoset{}
  """
  def process_deletes pas, pss do
    delete_album_ids = PhotoUpdater.album_ids_to_delete(pas, pss)

    PhotoManager.delete_albums(delete_album_ids)

    PhotoManager.delete_photos_in_albums(delete_album_ids)
  end

  @doc """
  Determines if any PhotoAlbums should be deleted

  Looks for PhotoAlbums in the DB that were NOT
  returned by Flickr.

  @param photo_albums [List] of %PhotoAlbum{}
  @param flickr_photosets [List] of %Photoset{}

  @return [List] list of integer photo_album_ids
  """
  def album_ids_to_delete photo_albums, flickr_photosets do
    # collect ids
    photo_album_ids =
      photo_albums
      |> Enum.map(&(&1.photoset_id))

    photoset_ids =
      flickr_photosets
      |> Enum.map(&(&1.id))

    photo_album_ids -- photoset_ids
  end


  @doc """
  Find albums to create, and create them

  @param pas [List] of %PhotoAlbum{}
  @param pss [List] of %Photoset{}
  """
  def process_creates pas, pss do
    new_albums = PhotoUpdater.albums_to_create(pas, pss)
    PhotoManager.insert_albums(new_albums)

    new_photos = PhotoUpdater.flickr_photos_in_photosets(new_albums)
    PhotoManager.insert_photos(new_photos)
  end

  @doc """
  Determines which Photosets should be created (as PhotoAlbums)

  @param photo_albums [List] of %PhotoAlbum{}
  @param flickr_photosets [List] of %Photoset{}

  @return: [List] of %Photosets
  """
  def albums_to_create photo_albums, flickr_photosets do
    Enum.filter(flickr_photosets, fn(photoset) ->
      photo_album = Enum.find(photo_albums, &(&1.photoset_id == photoset.id))

      case photo_album do
        nil -> true
        _ -> false
      end
    end)
  end


  @doc """
  Find albums to update, and updates them

  @param pas [List] of %PhotoAlbum{}
  @param pss [List] of %Photoset{}
  """
  def process_updates pas, pss do
    albums_to_update = PhotoUpdater.albums_to_update(pas, pss)
    Enum.each(albums_to_update, fn([pa, ps]) ->
      PhotoManager.update_album(pa,ps)
    end)

    IO.puts("[ Updates ]: working on deletes..")
    # gather photoset_id for photos to delete
    deletes = Enum.map(albums_to_update, fn([pa, _ps]) -> pa.photoset_id end)

    IO.puts("[ Updates ]: deleting..")
    PhotoManager.delete_photos_in_albums(deletes)

    IO.puts("[ Updates ]: working on inserts..")
    # gather photosets for photos to add
    albums_to_update_chunk = albums_to_update
    |> Enum.chunk_every(20)

    for {albums, i} <- Enum.with_index(albums_to_update_chunk) do
      inserts = albums
      |> Enum.map(fn([_pa, ps]) -> ps end)
      |> PhotoUpdater.flickr_photos_in_photosets

      IO.puts("[ Updates ]: inserting #{(i+1)*length(albums_to_update_chunk)} of #{length(albums_to_update)}..")
      PhotoManager.insert_photos(inserts)
    end

  end

  @doc """
  Determines which PhotoAlbums should be updated (with Photosets)

  @param photo_albums [List] of %PhotoAlbum{}
  @param flickr_photosets [List] of %Photoset{}

  @return: [List] of [%PhotoAlbum{}, %Photosets{}]
  """
  def albums_to_update photo_albums, flickr_photosets  do
    Stream.map(flickr_photosets, fn(photoset) ->
      # find the corresponding %PhotoAlbum, if there is one
      photo_album = Enum.find(photo_albums, &(&1.photoset_id == photoset.id))

      case photo_album do
        nil -> nil
        _ ->
          # Check if photoset is newer
          photoset.date_update
          |> DateTime.compare(photo_album.last_updated)
          |> case do
            :gt -> [photo_album, photoset]
            _ -> nil # else return nil
          end
      end
    end)
    |> Enum.filter(&(!is_nil(&1)))
  end

  def flickr_photos_in_photosets photosets do
    Enum.map(photosets, fn(ps) ->
      ps
      |> @flickr.get_photos_in_photoset
      |> @flickr.parse_photo_resp
    end)
    |> List.flatten
  end

end
