defmodule TreelibWeb.SpeciesController do
  use TreelibWeb, :controller

  @moduledoc """
  Controller for genera
  """

  alias Treelib.PhotoManager
  alias Treelib.PhotoManager.PhotoBuilder

  alias Treelib.Taxonomy

  alias Treelib.Taxonomy.{
    SpeciesManager,
    Species,
    GenusManager,
    Genus
  }

  alias Treelib.QR.QrManager

  action_fallback AdminFallbackController

  def index(conn, _params) do
    species = SpeciesManager.species_list()

    live_render(conn, TreelibWeb.SpeciesLiveView,
      species: species,
      session: %{
        species: species
      }
    )

    # render conn, "index.html", species: species
  end

  def index_json(conn, _params) do
    with {:ok, _current_user} <- auth_admin(conn) do
      render(conn, "index.json", species: SpeciesManager.all())
    else
      {:error, _} -> redirect(conn, to: Routes.search_path(conn, :index))
    end
  end

  def show(conn, %{"id" => id}) do
    with {:ok, %Species{} = species} <- SpeciesManager.get_species(id),
         {:ok, %Genus{} = genus} <- GenusManager.get_genus(species.genus_id) do
      photos =
        PhotoManager.photos_for_species(species.id)
        |> Enum.map(&PhotoManager.format_photo_for_web(&1))

      render(conn, "show.html",
        page_data: %{
          species: species,
          genus: genus,
          photos: photos,
          contributors: species.contributors
        },
        layout: {TreelibWeb.LayoutView, "species.html"}
      )
    end
  end

  def create(conn, params) do
    with {:ok, _current_user} <- auth_admin(conn),
         {:ok, %Species{} = species} <- SpeciesManager.create_species(params) do
      conn
      |> put_status(:created)
      |> put_resp_header("species", Routes.species_path(conn, :edit, species))
      |> json(%{id: species.id})
    end
  end

  def edit(conn, %{"id" => id} = _params) do
    with {:ok, _current_user} <- auth_admin(conn),
         {:ok, %Species{} = species} <- SpeciesManager.get_species(id) do
      genera = Taxonomy.get_genus_list()
      photo_albums = PhotoManager.list_of_albums()

      photos =
        PhotoManager.photos_for_species(species.id)
        |> Enum.map(&%{url: PhotoBuilder.photo_url(&1, "q")})

      qr_code = QrManager.get_by_type("species", species.id)

      render(conn, "edit.html",
        page_data:
          json_encode!(%{
            species: species,
            genera: genera,
            photo_albums: photo_albums,
            photos: photos,
            hardiness_types: Species.HardinessTypes.all(),
            qr_code_url: QrManager.qr_code_url(qr_code)
          })
      )
    else
      {:error, :not_found} -> redirect(conn, to: Routes.species_path(conn, :new))
    end
  end

  def new(conn, _params) do
    with {:ok, _current_user} <- auth_admin(conn) do
      genera = Taxonomy.get_genus_list()
      photo_albums = PhotoManager.list_of_albums()

      render(conn, "edit.html",
        page_data: json_encode!(%{species: %{}, genera: genera, photo_albums: photo_albums})
      )
    end
  end

  def update(conn, %{"id" => id} = params) do
    with {:ok, _current_user} <- auth_admin(conn),
         {:ok, %Species{} = species} <- SpeciesManager.get_species(id),
         {:ok, %Species{} = species} <- SpeciesManager.update_species(species, params),
         do:
           conn
           |> put_status(:ok)
           |> put_resp_header("species", Routes.species_path(conn, :edit, species))
           |> json(%{id: species.id})
  end

  def delete(conn, %{"id" => id} = _params) do
    with {:ok, _current_user} <- auth_admin(conn),
         {:ok, %Species{} = species} <- SpeciesManager.get_species(id),
         {:ok, %Species{} = species} <- SpeciesManager.disable_species(species),
         do:
           conn
           |> put_status(:ok)
           |> put_resp_header("species", Routes.species_path(conn, :edit, species))
           |> json(%{id: species.id})
  end
end
