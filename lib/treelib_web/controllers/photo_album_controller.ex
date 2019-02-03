defmodule TreelibWeb.PhotoAlbumController do
  use TreelibWeb, :controller
  @moduledoc """
  Controller for retreiving photo albums
  """

  alias Treelib.PhotoManager

  def index(conn, _params) do
    with {:ok, _current_user} <- auth_admin(conn) do
    render(conn, "index.json", albums: PhotoManager.list_albums)
    else
      {:error, _ } -> redirect conn, to: Routes.page_path(conn, :home)
    end
  end
end
