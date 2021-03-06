defmodule Treelib.Taxonomy.SpeciesManager do
  @moduledoc """
    Handles Species creation, updates, deletion, and get.
  """

  import Ecto.Query, warn: false
  alias Treelib.Repo

  alias Treelib.Taxonomy.{
    Species,
    Genus
  }
  alias Treelib.Contributions.Contributor

  @doc """
  Returns all active species.
  """
  def all do
    Species.active
    |> Repo.all
    |> Repo.preload([contributors: Contributor.active])
  end

  @doc """
  Returns all active species for Species List page.
  """
  def species_list do
    Repo.all(
      from s in Species,
      join: g in Genus,
      on: s.genus_id == g.id,
      where: s.enabled == true and s.hide == false,
      order_by: [g.name, s.name],
      select: %{
        id: s.id,
        genus_name: g.name,
        genus_common_name: g.common_name,
        species_name: s.name,
        species_common_name: s.common_name,
      })
  end

  @doc """
  Gets a single species.

  Raises `Ecto.NoResultsError` if the Species does not exist.

  ## Examples

      iex> get_species!(123)
      %Species{}

      iex> get_species!(456)
      ** (Ecto.NoResultsError)

  """
  def get_species!(id) do
    Species.active
    |> Repo.get!(id)
  end

  def get_species(id) do
    Species.active
    |> Repo.get(id)
    |> Repo.preload([contributors: Contributor.active])
    |> case do
      %Species{} = species ->
        {:ok, species}
      nil ->
        {:error, :not_found}
    end
  end

  @doc """
  Creates a species.

  ## Examples

      iex> create_species(%{field: value})
      {:ok, %Species{}}

      iex> create_species(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_species(attrs \\ %{}) do
    %Species{}
    |> Species.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a species.

  ## Examples

      iex> update_species(species, %{field: new_value})
      {:ok, %Species{}}

      iex> update_species(species, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_species(%Species{} = species, attrs) do
    species
    |> Species.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Species.

  ## Examples

      iex> delete_species(species)
      {:ok, %Species{}}

      iex> delete_species(species)
      {:error, %Ecto.Changeset{}}

  """
  def delete_species(%Species{} = species) do
    Repo.delete(species)
  end

  @doc """
  Disables a Species.

  ## Examples

      iex> disable_species(species)
      {:ok, %Species{}}

      iex> disable_species(species)
      {:error, %Ecto.Changeset{}}

  """
  def disable_species(%Species{} = species) do
    species
    |> Species.disable_changeset(%{id: species.id, enabled: false})
    |> Repo.update()
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking species changes.

  ## Examples

      iex> change_species(species)
      %Ecto.Changeset{source: %Species{}}

  """
  def change_species(%Species{} = species) do
    Species.changeset(species, %{})
  end

  def with_genus(species) do
    species
    |> Repo.preload(:genus)
  end
end
