defmodule Treelib.Taxonomy.GenusManager do
  @moduledoc """
    Handles Genus creation, updates, deletion, and get.
  """

  import Ecto.Query, warn: false
  alias Treelib.Repo

  alias Treelib.Taxonomy.Genus

  @doc """
  Gets a single genus.

  Raises `Ecto.NoResultsError` if the Genus does not exist.

  ## Examples

      iex> get_genus!(123)
      %Genus{}

      iex> get_genus!(456)
      ** (Ecto.NoResultsError)

  """
  def get_genus!(id) do
    Genus.all
    |> Repo.get!(id)
  end

  def get_genus(id) do
    Genus.all 
    |> Repo.get(id)
    |> case do
      %Genus{} = genus -> 
        {:ok, genus}
      nil -> 
        {:error, :not_found} 
    end
  end

  @doc """
  Gets a single genus by its name.

  Raises `Ecto.NoResultsError` if the genus does not exist.

  ## Examples

      iex> get_by_name!("Abies)
      %Genus{}

      iex> get_by_name!("Abies")
      ** (Ecto.NoResultsError)

  """
  def get_by_name!(name) do
    Genus.all
    |> Repo.get_by!(name: name)
  end

  def get_by_name(name) do
    Genus.all 
    |> Repo.get_by(name: name)
    |> case do
      %Genus{} = genus -> 
        {:ok, genus}
      nil -> 
        {:error, :not_found} 
    end
  end

  @doc """
  Creates a genus.

  ## Examples

      iex> create_genus(%{field: value})
      {:ok, %Genus{}}

      iex> create_genus(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_genus(attrs \\ %{}) do
    %Genus{}
    |> Genus.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a genus.

  ## Examples

      iex> update_genus(genus, %{field: new_value})
      {:ok, %Genus{}}

      iex> update_genus(genus, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_genus(%Genus{} = genus, attrs) do
    genus
    |> Genus.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Genus.

  ## Examples

      iex> delete_genus(genus)
      {:ok, %Genus{}}

      iex> delete_genus(genus)
      {:error, %Ecto.Changeset{}}

  """
  def delete_genus(%Genus{} = genus) do
    Repo.delete(genus)
  end

  @doc """
  Disables a Genus.

  ## Examples

      iex> disable_genus(genus)
      {:ok, %Species{}}

      iex> disable_genus(genus)
      {:error, %Ecto.Changeset{}}

  """
  def disable_genus(%Genus{} = genus) do
    genus
    |> Genus.disable_changeset(%{id: genus.id, enabled: false})
    |> Repo.update()
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking genus changes.

  ## Examples

      iex> change_genus(genus)
      %Ecto.Changeset{source: %Genus{}}

  """
  def change_genus(%Genus{} = genus) do
    Genus.changeset(genus, %{})
  end

end

