defmodule Treelib.Taxonomy.FamilyManager do
  @moduledoc """
    Handles Family creation, updates, deletion, and get.
  """

  import Ecto.Query, warn: false
  alias Treelib.Repo

  alias Treelib.Taxonomy.Family

  @doc """
  Gets a single family.

  Raises `Ecto.NoResultsError` if the Family does not exist.

  ## Examples

      iex> get_family!(123)
      %Family{}

      iex> get_family!(456)
      ** (Ecto.NoResultsError)

  """
  def get_family!(id) do
    Family.all
    |> Repo.get!(id)
  end

  def get_family(id) do
    Family.all 
    |> Repo.get(id)
    |> case do
      %Family{} = family  -> 
        {:ok, family}
      nil -> 
        {:error, :not_found} 
    end
  end

  @doc """
  Creates a family.

  ## Examples

      iex> create_family(%{field: value})
      {:ok, %Family{}}

      iex> create_family(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_family(attrs \\ %{}) do
    %Family{}
    |> Family.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a family.

  ## Examples

      iex> update_family(family, %{field: new_value})
      {:ok, %Family{}}

      iex> update_family(family, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_family(%Family{} = family, attrs) do
    family
    |> Family.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Family.

  ## Examples

      iex> delete_family(family)
      {:ok, %Family{}}

      iex> delete_family(family)
      {:error, %Ecto.Changeset{}}

  """
  def delete_family(%Family{} = family) do
    Repo.delete(family)
  end

  @doc """
  Disables a Genus.

  ## Examples

      iex> disable_family(family)
      {:ok, %Species{}}

      iex> disable_family(family)
      {:error, %Ecto.Changeset{}}

  """
  def disable_family(%Family{} = family) do
    family
    |> Family.disable_changeset(%{id: family.id, enabled: false})
    |> Repo.update()
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking family changes.

  ## Examples

      iex> change_family(family)
      %Ecto.Changeset{source: %Family{}}

  """
  def change_family(%Family{} = family) do
    Family.changeset(family, %{})
  end

end
