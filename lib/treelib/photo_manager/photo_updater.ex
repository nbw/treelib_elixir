defmodule Treelib.PhotoManager.PhotoUpdater do
  @moduledoc """
  Manages syncing between Flickr and DB
  """

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
      |> Enum.map(&(get_photoset_id(&1)))

    photo_album_ids -- photoset_ids
  end

  @doc """
  Determines which Photosets should be created (as PhotoAlbums)

  @param photo_albums [List] of %PhotoAlbum{}
  @param flickr_photosets [List] of %Photoset{}

  @return: [List] of %Photosets
  """
  def albums_to_create photo_albums, flickr_photosets do
    Enum.filter(flickr_photosets, fn(photoset) ->
      photoset_id = String.to_integer(photoset.id)
      
      photo_album = Enum.find(photo_albums, &(&1.photoset_id == photoset_id))

      case photo_album do
        nil -> true
        _ -> false
      end
    end)
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
      photoset_id = String.to_integer(photoset.id)
      photo_album = Enum.find(photo_albums, &(&1.photoset_id == photoset_id))

      case photo_album do
        nil -> nil
        _ -> 
          # Check if photoset is newer
          String.to_integer(photoset.date_update) 
          |> DateTime.from_unix!
          |> DateTime.compare(photo_album.last_updated)
          |> case do
            :gt -> [photo_album, photoset]
            _ -> nil # else return nil
          end
      end
    end)
    |> Enum.filter(&(!is_nil(&1)))
  end

  defp get_photoset_id photoset do
    String.to_integer(photoset.id) 
  end

end
