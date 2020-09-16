defmodule TreelibWeb.SearchController do
  use TreelibWeb, :controller
  @moduledoc """
  Controller for search page
  """

  alias Treelib.Taxonomy
  alias Treelib.Taxonomy.FamilyManager
  alias Treelib.Taxonomy.Family
  alias Treelib.Taxonomy.GenusManager
  alias Treelib.Taxonomy.Genus
  alias Treelib.Taxonomy.SpeciesManager
  alias Treelib.Taxonomy.Species

  def index(conn, %{"f" => id} = _params) do
    with {:ok, %Family{} = family} <- FamilyManager.get_family(id) do
      pay_load = %{
        tree: Taxonomy.all,
        pre_selected: %{
          type: "family",
          item: family
        }
      }
      render conn, "index.html", page_data: json_encode!(pay_load)
    else
      _ -> render conn, "index.html", page_data: json_encode!(%{ tree: Taxonomy.all})
    end
  end

  def index(conn, %{"g" => id} = _params) do
    with {:ok, %Genus{} = genus} <- GenusManager.get_genus(id) do
      pay_load = %{
        tree: Taxonomy.all,
        pre_selected: %{
          type: "genus",
          item: genus
        }
      }
      render conn, "index.html", page_data: json_encode!(pay_load)
    else
      _ -> render conn, "index.html", page_data: json_encode!(%{ tree: Taxonomy.all})
    end
  end

  def index(conn, %{"s" => id} = _params) do
    with {:ok, %Species{} = species} <- SpeciesManager.get_species(id) do
      pay_load = %{
        tree: Taxonomy.all,
        pre_selected: %{
          type: "species",
          item: species
        }
      }
      render conn, "index.html", page_data: json_encode!(pay_load)
    else
      _ -> render conn, "index.html", page_data: json_encode!(%{ tree: Taxonomy.all})
    end
  end

  def index(conn, _params) do
    render conn, "index.html", page_data: json_encode!(%{ tree: Taxonomy.all})
  end
end
