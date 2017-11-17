defmodule TreelibWeb.SpeciesController do
  use TreelibWeb, :controller
  @moduledoc """
  Controller for genera
  """

  alias Treelib.PhotoManager
  alias Treelib.PhotoManager.PhotoBuilder

  alias Treelib.Taxonomy
  alias Treelib.Taxonomy.SpeciesManager
  alias Treelib.Taxonomy.Species
  alias Treelib.Taxonomy.GenusManager
  alias Treelib.Taxonomy.Genus

  action_fallback AdminFallbackController

  def show(conn,  %{"id" => id} = params) do
    with {:ok, %Species{} = species} <- SpeciesManager.get_species(id),
         {:ok, %Genus{} = genus} <- GenusManager.get_genus(species.genus_id) do
        photos = PhotoManager.photos_for_species(species.id) 
                 |> Enum.map(&PhotoManager.format_photo_for_web(&1))

        render conn, "show.html", page_data: %{species: species, genus: genus, photos: photos}, layout: {TreelibWeb.LayoutView, "species.html"}
    end
  end

  def create(conn, params) do
    with {:ok, _current_user} <- auth_admin(conn), 
         {:ok, %Species{} = species} <- SpeciesManager.create_species(params) do
      conn
      |> put_status(:created)
      |> put_resp_header("species", species_path(conn, :edit, species))
      |> json(%{id: species.id}) 
    end 
  end

  def edit(conn, %{"id" => id} = _params) do
    with {:ok, _current_user} <- auth_admin(conn), 
         {:ok, %Species{} = species} <- SpeciesManager.get_species(id) 
    do
      genera = Taxonomy.get_genus_list
      photo_albums = PhotoManager.list_of_albums
      photos = PhotoManager.photos_for_species(species.id) |> Enum.map(&(%{url: PhotoBuilder.photo_url(&1, "q")}))
      render conn, "edit.html", page_data: json_encode!(%{species: species, genera: genera, photo_albums: photo_albums, photos: photos})
    else
      {:error, :not_found} -> redirect(conn, to: species_path(conn, :new))
    end
  end

  def new(conn, _params) do
    with {:ok, _current_user} <- auth_admin(conn) do
      genera = Taxonomy.get_genus_list
      photo_albums = PhotoManager.list_of_albums
      render conn, "edit.html", page_data: json_encode!(%{species: %{}, genera: genera, photo_albums: photo_albums})
    end
  end

  def update(conn, %{"id" => id} = params) do
    with {:ok, _current_user} <- auth_admin(conn), 
         {:ok, %Species{} = species} <- SpeciesManager.get_species(id),
         {:ok, %Species{} = species} <- SpeciesManager.update_species(species, params),
    do:
      conn
      |> put_status(:ok)
      |> put_resp_header("species", species_path(conn, :edit, species))
      |> json(%{id: species.id}) 
  end

  def delete(conn, %{"id" => id} = _params) do
    with {:ok, _current_user} <- auth_admin(conn), 
         {:ok, %Species{} = species} <- SpeciesManager.get_species(id),
         {:ok, %Species{} = species} <- SpeciesManager.disable_species(species),
    do:
      conn
      |> put_status(:ok)
      |> put_resp_header("species", species_path(conn, :edit, species))
      |> json(%{id: species.id}) 
  end

end


