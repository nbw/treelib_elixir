defmodule Treelib.PhotoManager do
  @moduledoc """
  Manages photo retrieval related tasks
  """

  import Ecto.Query, warn: false
  alias Treelib.Repo

  alias Treelib.PhotoManager.PhotoAlbum
  alias Treelib.PhotoManager.PhotoBuilder
  alias Treelib.PhotoManager.Photo

  alias Treelib.Taxonomy.Family
  alias Treelib.Taxonomy.Genus
  alias Treelib.Taxonomy.Species

  @chunk_size 100

  @doc"""
  Returns photos for a species.
  """
  def photos_for_species species_id do
    Repo.all from p in Photo,
      join: a in assoc(p, :photo_album),
      join: s in Species, on: a.id == s.album_id and s.enabled == true,
      where: s.id == ^species_id
  end

  @doc"""
  Returns photos for a genus.

  ## Examples
  iex> photos_for_genus(1)
      [%Photo{..}, ..]
  """
  def photos_for_genus genus_id do
    Repo.all from p in Photo,
      join: a in assoc(p, :photo_album),
      join: s in Species, on: a.id == s.album_id and s.enabled == true,
      join: g in Genus, on: s.genus_id == g.id and g.enabled == true,
      where: g.id == ^genus_id
  end


  @doc"""
  Returns random photos for a genus.

  ## Examples
  iex> photos_for_genus(1,20)
      [%Photo{..}, ..]
  """
  def photos_for_genus genus_id, num do
    photos_for_genus(genus_id)
    |> Enum.take_random(num)
  end


  @doc"""
  Returns photos for a family.
  """
  def photos_for_family family_id do
    Repo.all from p in Photo,
      join: a in assoc(p, :photo_album),
      join: s in Species, on: a.id == s.album_id and s.enabled == true,
      join: g in Genus, on: s.genus_id == g.id and g.enabled == true,
      join: f in Family, on: g.fam_id == f.id and f.enabled == true,
      where: f.id == ^family_id
  end

  @doc"""
  Returns random photos for a family.

  ## Examples
  iex> photos_for_family(1,20)
      [%Photo{..}, ..]
  """
  def photos_for_family family_id, num do
    photos_for_family(family_id)
    |> Enum.take_random(num)
  end


  #####################################
  #  *********  PhotoAlbums  **********
  #####################################

  @doc """
  Returns the list of photo albums.

  ## Examples

      iex> list_albums()
      [%PhotoAlbum{}, ...]

  """

  def list_albums do
    Repo.all(PhotoAlbum)
  end

  @doc """
  Returns the list of albums, formatted by id and name.

  Used for frontend

  ## Examples

      iex> list_albums()
      [%{id: 1, name: "Pine"}, ...]

  """
  def list_of_albums do
    PhotoAlbum
    |> select([p], %{id: p.id, name: p.name})
    |> order_by([p], asc: p.name)
    |> Repo.all
  end

  @doc """
  Gets a single album.

  Raises `Ecto.NoResultsError` if the Album does not exist.

  ## Examples

      iex> get_album!(123)
      %PhotoAlbum{}

      iex> get_album!(456)
      ** (Ecto.NoResultsError)

  """
  def get_album!(id), do: Repo.get!(PhotoAlbum, id)

  @doc """
  Creates a album.

  ## Examples

      iex> create_album(%{field: value})
      {:ok, %Album{}}

      iex> create_album(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_album(attrs \\ %{}) do
    %PhotoAlbum{}
    |> PhotoAlbum.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Update album from photoset
  """
  def update_album(%PhotoAlbum{} = album, %Flickr.Photoset{} = photoset) do
    album
    |> PhotoAlbum.photoset_changeset(photoset)
    |> Repo.update()
  end

  @doc """
  Updates a album.

  ## Examples

      iex> update_album(album, %{field: new_value})
      {:ok, %Album{}}

      iex> update_album(album, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_album(%PhotoAlbum{} = album, attrs) do
    album
    |> PhotoAlbum.changeset(attrs)
    |> Repo.update()
  end


  @doc """
  Deletes a Album.

  ## Examples

      iex> delete_album(album)
      {:ok, %PhotoAlbum{}}

      iex> delete_album(album)
      {:error, %Ecto.Changeset{}}

  """
  def delete_album(%PhotoAlbum{} = album) do
    Repo.delete(album)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking album changes.

  ## Examples

      iex> change_album(album)
      %Ecto.Changeset{source: %PhotoAlbum{}}

  """
  def change_album(%PhotoAlbum{} = album) do
    PhotoAlbum.changeset(album, %{})
  end


  @doc """
  Uses an insert_all(..) to insert multiple PhotoAlbums
  into the db
  """
  def insert_albums(photosets) when is_list(photosets)  do
    albums = Enum.map(photosets, fn(photoset) ->
      Flickr.Photoset.into_photo_album(photoset)
    end)

    albums
    |> Enum.chunk_every(@chunk_size)
    |> Enum.each(fn(albums_chunk)->
      Repo.insert_all(PhotoAlbum, albums_chunk)
    end)
  end

  @doc """
  Delete a list of PhotoAlbums using Repo.delete_all
  """
  def delete_albums(album_ids) when is_list(album_ids)  do
    if Kernel.length(album_ids) > 0 do
      album_ids
      |> Enum.chunk_every(@chunk_size)
      |> Enum.each(fn(album_ids_chunk) ->
        PhotoAlbum
        |> where([p], p.photoset_id in ^album_ids_chunk)
        |> Repo.delete_all
      end)
    end
  end



  #####################################
  #  *********  Photos  **********
  #####################################

  @doc """
  Returns the list of photos.

  ## Examples

      iex> list_photos()
      [%Photo{}, ...]

  """
  def list_photos do
    Repo.all(Photo)
  end


  @doc """
  Gets a single photo.

  Raises `Ecto.NoResultsError` if the Photo does not exist.

  ## Examples

      iex> get_photo!(123)
      %Photo{}

      iex> get_photo!(456)
      ** (Ecto.NoResultsError)

  """
  def get_photo!(id), do: Repo.get!(Photo, id)

  @doc """
  Creates a photo.

  ## Examples

      iex> create_photo(%{field: value})
      {:ok, %Photo{}}

      iex> create_photo(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_photo(attrs \\ %{}) do
    %Photo{}
    |> Photo.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a photo.

  ## Examples

      iex> update_photo(photo, %{field: new_value})
      {:ok, %Photo{}}

      iex> update_photo(photo, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_photo(%Photo{} = photo, attrs) do
    photo
    |> Photo.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Photo.

  ## Examples

      iex> delete_photo(photo)
      {:ok, %Photo{}}

      iex> delete_photo(photo)
      {:error, %Ecto.Changeset{}}

  """
  def delete_photo(%Photo{} = photo) do
    Repo.delete(photo)
  end

  @doc """
  Delete photos from an album based on photoset_id
  """
  def delete_photos_in_album(%PhotoAlbum{} = album) do
    Photo
    |> where([p], p.photoset_id in ^album.photoset_id)
    |> Repo.delete_all
  end

  @doc """
  Delete photos from an album based on photoset_id
  """
  def delete_photos_in_albums(album_ids) when is_list(album_ids) do
    if Kernel.length(album_ids) > 0 do
      album_ids
      |> Enum.chunk_every(@chunk_size)
      |> Enum.each(fn(album_ids_chunk)->
        Photo
        |> where([p], p.photoset_id in ^album_ids_chunk)
        |> Repo.delete_all
      end)
    end
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking photo changes.

  ## Examples

      iex> change_photo(photo)
      %Ecto.Changeset{source: %Photo{}}

  """
  def change_photo(%Photo{} = photo) do
    Photo.changeset(photo, %{})
  end

  @doc """
  Uses an insert_all(..) to insert multiple Photos
  into the db
  """
  def insert_photos(photos) when is_list(photos)  do
    photos
    |> Enum.map(fn(p) ->
      Flickr.Photo.into_db_photo(p)
    end)
    |> Enum.chunk_every(@chunk_size)
    |> Enum.each(fn(p) ->
      Repo.insert_all(Photo, p)
    end)
  end

  @doc """
  Returns a map of photo urls, name, description, and download url

  ## Examples

      iex> format_photo_for_web(%Photo)
          %{
            thumb: "",
            meduim: "",
            original: "",
            name: "",
            description: "",
            flickr_url: ""
          }
  """
  def format_photo_for_web(%Photo{} = photo) do
      %{
        thumb: PhotoBuilder.photo_url(photo, "b"),
        medium: PhotoBuilder.photo_url(photo, "b"),
        original: PhotoBuilder.photo_url(photo, "b"),
        name: photo.name,
        description: photo.description,
        flickr_url: ""
      }
  end

end
