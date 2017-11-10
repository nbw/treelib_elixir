defmodule Treelib.PhotoManager.PhotoUpdater do
  @moduledoc """
  Manages syncing between Flickr and DB
  """

  @doc """
  Determines if any PhotoAlbums should be deleted

  Looks for PhotoAlbums in the DB that were NOT
  returned by Flickr.

  @returns: [List] list of photo_album_ids
  """
  def albums_ids_to_delete photo_albums, flickr_photosets do
    # collect ids
    photo_album_ids = 
      photo_albums
      |> Enum.map(&(&1.photoset_id))

    photoset_ids = 
      flickr_photosets
      |> Enum.map(&(get_photoset_id(&1)))

    photo_album_ids -- photoset_ids
  end

  def albums_to_create do
   true 
  end
  
  def albums_to_update do
   true 
  end

  defp get_photoset_id photoset do
    String.to_integer(photoset["id"]) 
  end

end
