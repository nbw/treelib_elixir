defmodule TreelibWeb.SearchController do
  use TreelibWeb, :controller
  @moduledoc """
  Controller for search page
  """

  alias Treelib.Taxonomy

  def index(conn, _params) do
    render conn, "index.html", page_data: json_encode!(%{ tree: Taxonomy.all})
  end
end
