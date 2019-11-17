defmodule TreelibWeb.AdminController do
  use TreelibWeb, :controller
  @moduledoc """
  Controller for admin pages
  """

  Treelib.PhotoManager.PhotoChecker

  action_fallback AdminFallbackController

  def index(conn, _params) do
    with {:ok, _current_user} <- auth_admin(conn) do
      render conn, "index.html", page_data: %{tree: Treelib.Taxonomy.all}
    end
  end

  def refresh(conn, _params) do
    with {:ok, _current_user} <- auth_admin(conn) do
      Treelib.PhotoManager.PhotoChecker.update
      send_resp(conn, 200, "Refresh successful.")
    end
  end
end

