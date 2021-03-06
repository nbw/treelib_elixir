defmodule TreelibWeb.FamilyController do
  use TreelibWeb, :controller
  @moduledoc """
  Controller for families
  """

  alias Treelib.Taxonomy
  alias Treelib.Taxonomy.FamilyManager
  alias Treelib.Taxonomy.Family

  alias Treelib.PhotoManager

  action_fallback AdminFallbackController

  def index(conn, _params) do
    with {:ok, _current_user} <- auth_admin(conn) do
      render(conn, "index.json", families: Taxonomy.all)
    else
      {:error, _ } -> redirect conn, to: Routes.search_path(conn, :index)
    end
  end

  def show(conn,  %{"id" => id}) do
    with {:ok, %Family{} = family} <- FamilyManager.get_family(id) do
        photos = PhotoManager.photos_for_family(family.id, 20)
                 |> Enum.map(&PhotoManager.format_photo_for_web(&1))

        render conn, "show.html", page_data: %{family: family, photos: photos}, layout: {TreelibWeb.LayoutView, "family.html"}
    end
  end

  def create(conn, params) do
    with {:ok, _current_user} <- auth_admin(conn),
         {:ok, %Family{} = family} <- FamilyManager.create_family(params) do
      conn
      |> put_status(:created)
      |> put_resp_header("family", Routes.family_path(conn, :edit, family))
      |> json(%{id: family.id})
    end
  end

  def edit(conn, %{"id" => id} = _params) do
    with {:ok, _current_user} <- auth_admin(conn),
         {:ok, %Family{} = family} <- FamilyManager.get_family(id)
    do
        render conn, "edit.html", page_data: json_encode!(%{family: family})
    else
      {:error, :not_found} -> redirect(conn, to: Routes.family_path(conn, :new))
    end
  end

  def new(conn, _params) do
    with {:ok, _current_user} <- auth_admin(conn) do
      render conn, "edit.html", page_data: json_encode!(%{family: %{}})
    end
  end

  def update(conn, %{"id" => id} = params) do
    with {:ok, _current_user} <- auth_admin(conn),
         {:ok, %Family{} = family} <- FamilyManager.get_family(id),
         {:ok, %Family{} = family} <- FamilyManager.update_family(family, params),
    do:
      conn
      |> put_status(:ok)
      |> put_resp_header("family", Routes.family_path(conn, :edit, family))
      |> json(%{id: family.id})
  end

  def delete(conn, %{"id" => id} = _params) do
    with {:ok, _current_user} <- auth_admin(conn),
         {:ok, %Family{} = family} <- FamilyManager.get_family(id),
         {:ok, %Family{} = family} <- FamilyManager.disable_family(family),
    do:
      conn
      |> put_status(:ok)
      |> put_resp_header("family", Routes.family_path(conn, :edit, family))
      |> json(%{id: family.id})
  end

end
