defmodule Treelib.PhotoManager do
  @moduledoc """
  Manages photo retrieval related tasks
  """

  import Ecto.Query, warn: false
  alias Treelib.Repo

  alias Treelib.PhotoManager.PhotoAlbum
  alias Treelib.PhotoManager.Photo

  alias Treelib.Taxonomy.Family
  alias Treelib.Taxonomy.Genus
  alias Treelib.Taxonomy.Species

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
      
  """
  def photos_for_genus genus_id do
    Repo.all from p in Photo,
      join: a in assoc(p, :photo_album), 
      join: s in Species, on: a.id == s.album_id and s.enabled == true,
      join: g in Genus, on: s.genus_id == g.id and g.enabled == true,
      where: g.id == ^genus_id
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

  @doc """
  Returns the list of albums.

  ## Examples

      iex> list_albums()
      [%{id: 1, name: "Pine"}, ...]

  """
  def list_albums do
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

  alias Treelib.PhotoManager.Photo

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
  Returns an `%Ecto.Changeset{}` for tracking photo changes.

  ## Examples

      iex> change_photo(photo)
      %Ecto.Changeset{source: %Photo{}}

  """
  def change_photo(%Photo{} = photo) do
    Photo.changeset(photo, %{})
  end
end
