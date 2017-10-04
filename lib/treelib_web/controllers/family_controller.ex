defmodule TreelibWeb.FamilyController do
  use TreelibWeb, :controller
  @moduledoc """
  Controller for families
  """

  alias Treelib.Taxonomy.FamilyManager
  alias Treelib.Taxonomy.Family

  action_fallback AdminFallbackController

  def create(conn, params) do
    with {:ok, current_user} <- auth_admin(conn), 
         {:ok, %Family{} = family} <- FamilyManager.create_family(params) do
      conn
      |> put_status(:created)
      |> put_resp_header("family", family_path(conn, :edit, family))
      |> json(%{id: family.id}) 
    end 
  end

  def edit(conn, %{"id" => id} = params) do
    with {:ok, current_user} <- auth_admin(conn), 
         {:ok, %Family{} = family} <- FamilyManager.get_family(id) 
    do
        render conn, "edit.html", page_data: json_encode!(%{family: family})
    else
      {:error, :not_found} -> redirect(conn, to: family_path(conn, :new))
    end
  end

  def new(conn, _params) do
    render conn, "edit.html", page_data: json_encode!(%{family: %{}})
  end

  def update(conn, %{"id" => id} = params) do
    with {:ok, current_user} <- auth_admin(conn), 
         {:ok, %Family{} = family} <- FamilyManager.get_family(id),
         {:ok, %Family{} = family} <- FamilyManager.update_family(family, params),
    do:
      conn
      |> put_status(:ok)
      |> put_resp_header("family", family_path(conn, :edit, family))
      |> json(%{id: family.id}) 
  end

  def delete(conn, %{"id" => id} = params) do
    with {:ok, current_user} <- auth_admin(conn), 
         {:ok, %Family{} = family} <- FamilyManager.get_family(id),
         {:ok, %Family{} = family} <- FamilyManager.delete_family(family),
    do:
      conn
      |> put_status(:ok)
      |> put_resp_header("family", family_path(conn, :edit, family))
      |> json(%{id: family.id}) 
  end

end
