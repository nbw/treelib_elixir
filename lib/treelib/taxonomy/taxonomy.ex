defmodule Treelib.Taxonomy do
  @moduledoc """
  The Taxonomy context.
  """

  import Ecto.Query, warn: false
  alias Treelib.Repo

  alias Treelib.Taxonomy.Family
  alias Treelib.Taxonomy.Genus
  alias Treelib.Taxonomy.Species

  @doc """
  Returns a list of all families, genera, and species; all enabled
  """
  def all do
    Family.all
    |> Repo.all
  end


  @doc """
  Returns a list of all active families with their corresponding id

  ## Examples

      iex> get_family_list
      [
        %{ id: 34, name: "Plantanaceae" },
        %{ ... },
        ...
      ]
  """
  def get_family_list do
    Family.active
    |> select([f], %{id: f.id, name: f.name})
    |> order_by([p], asc: p.name)
    |> Repo.all
  end

  @doc """
  Returns a list of all active genera with their corresponding id

  ## Examples

      iex> get_genus_list
      [
        %{ id: 34, name: "Populus" },
        %{ ... },
        ...
      ]
  """
  def get_genus_list do
    Genus.active
    |> select([g], %{id: g.id, name: g.name})
    |> order_by([p], asc: p.name)
    |> Repo.all
  end

  @doc """
  Returns a list of all active species with their corresponding id

  ## Examples

      iex> get_species_list
      [
        %{ id: 34, name: "Fir" },
        %{ ... },
        ...
      ]
  """
  def get_species_list do
    Species.active
    |> join(:inner, [s], g in Genus, on: s.genus_id == g.id)
    |> select([s,g], %{id: s.id, name: s.name, genus_name: g.name })
    |> order_by([p], asc: p.name)
    |> Repo.all
  end
end
