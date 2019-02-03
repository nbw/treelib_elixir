defmodule TreelibWeb.ContributorController do
  use TreelibWeb, :controller

  alias Treelib.Contributions
  alias Treelib.Contributions.Contributor

  def index(conn, _params) do
    contributors = Contributions.list_contributors() |> Treelib.Repo.preload([species: [:genus]])
    render(conn, "index.html", contributors: contributors)
  end
end
