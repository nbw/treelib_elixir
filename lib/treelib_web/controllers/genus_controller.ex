defmodule TreelibWeb.GenusController do
  use TreelibWeb, :controller
  @moduledoc """
  Controller for genera
  """

  alias Treelib.Taxonomy.GenusManager
  alias Treelib.Taxonomy.Genus
  alias Treelib.Taxonomy

  alias Treelib.PhotoManager

  action_fallback AdminFallbackController

  def show(conn,  %{"id" => id} = params) do
    with {:ok, %Genus{} = genus} <- GenusManager.get_genus(id) do
        photos = PhotoManager.photos_for_genus(genus.id, 20) 
                 |> Enum.map(&PhotoManager.format_photo_for_web(&1))

        render conn, "show.html", page_data: %{genus: genus, photos: photos}, layout: {TreelibWeb.LayoutView, "genus.html"}
    end
  end

  def create(conn, params) do
    with {:ok, _current_user} <- auth_admin(conn), 
         {:ok, %Genus{} = genus} <- GenusManager.create_genus(params) do
      conn
      |> put_status(:created)
      |> put_resp_header("genus", genus_path(conn, :edit, genus))
      |> json(%{id: genus.id}) 
    end 
  end

  def edit(conn, %{"id" => id} = _params) do
    with {:ok, _current_user} <- auth_admin(conn), 
         {:ok, %Genus{} = genus} <- GenusManager.get_genus(id) 
    do
        render conn, "edit.html", page_data: json_encode!(%{genus: genus, families: Taxonomy.get_family_list})
    else
      {:error, :not_found} -> redirect(conn, to: genus_path(conn, :new))
    end
  end

  def new(conn, _params) do
    with {:ok, _current_user} <- auth_admin(conn) do
      render conn, "edit.html", page_data: json_encode!(%{genus: %{}, families: Taxonomy.get_family_list})
    end
  end

  def update(conn, %{"id" => id} = params) do
    with {:ok, _current_user} <- auth_admin(conn), 
         {:ok, %Genus{} = genus} <- GenusManager.get_genus(id),
         {:ok, %Genus{} = genus} <- GenusManager.update_genus(genus, params),
    do:
      conn
      |> put_status(:ok)
      |> put_resp_header("genus", genus_path(conn, :edit, genus))
      |> json(%{id: genus.id}) 
  end

  def delete(conn, %{"id" => id} = _params) do
    with {:ok, _current_user} <- auth_admin(conn), 
         {:ok, %Genus{} = genus} <- GenusManager.get_genus(id),
         {:ok, %Genus{} = genus} <- GenusManager.disable_genus(genus),
    do:
      conn
      |> put_status(:ok)
      |> put_resp_header("genus", genus_path(conn, :edit, genus))
      |> json(%{id: genus.id}) 
  end

end

