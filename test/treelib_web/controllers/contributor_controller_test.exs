defmodule TreelibWeb.ContributorControllerTest do
  use TreelibWeb, :controller
  use TreelibWeb.ConnCase

  alias Treelib.Contributions

  @create_attrs %{}
  @update_attrs %{}
  @invalid_attrs %{}

  def fixture(:contributor) do
    {:ok, contributor} = Contributions.create_contributor(@create_attrs)

    contributor
    |> Treelib.Repo.preload(:species)
  end

  describe "index" do
    test "lists all contributors", %{conn: conn} do
      conn = get(conn, Routes.contributor_path(conn, :index))
      assert html_response(conn, 200) =~ "Treelib would not be possible without the efforts of many contributors."
    end
  end

  defp create_contributor(_) do
    contributor = fixture(:contributor)
    {:ok, contributor: contributor}
  end
end
