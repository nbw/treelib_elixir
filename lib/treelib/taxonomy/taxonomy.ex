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
end
