defmodule TreelibWeb.AdminContributorControllerTest do
  use TreelibWeb, :controller
  use TreelibWeb.ConnCase

  alias Treelib.Contributions

  @create_attrs %{
    first_name: "Joe",
    last_name: "Bloe",
    description: "He's a dude."
  }
  @update_attrs %{}
  @invalid_attrs %{
    first_name: "",
  }

  def fixture(:contributor) do
    {:ok, contributor} = Contributions.create_contributor(@create_attrs)

    contributor
    |> Treelib.Repo.preload(:species)
  end

  setup [:login_admin]

  describe "index" do
    test "lists all contributors", %{conn: conn} do
      conn = get(conn, Routes.admin_contributor_path(conn, :index, contributors: []))
      assert html_response(conn, 200) =~ "Contributors"
    end
  end

  describe "new contributor" do
    test "renders form", %{conn: conn} do
      conn = get(conn, Routes.admin_contributor_path(conn, :new))
      assert html_response(conn, 200) =~ "New Contributor"
    end
  end

  describe "create contributor" do
    test "redirects to show when data is valid", %{conn: conn} do
      conn = post(conn, Routes.admin_contributor_path(conn, :create), contributor: @create_attrs)

      assert redirected_to(conn) == Routes.admin_contributor_path(conn, :index)

      conn = get(conn, Routes.admin_contributor_path(conn, :index))
      assert html_response(conn, 200) =~ "Contributors"
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.admin_contributor_path(conn, :create), contributor: @invalid_attrs)
      assert html_response(conn, 200) =~ "New Contributor"
    end
  end

  describe "edit contributor" do
    setup [:create_contributor]

    test "renders form for editing chosen contributor", %{conn: conn, contributor: contributor} do
      conn = get(conn, Routes.admin_contributor_path(conn, :edit, contributor))
      assert html_response(conn, 200) =~ "Edit Contributor"
    end
  end

  describe "update contributor" do
    setup [:create_contributor]

    test "redirects when data is valid", %{conn: conn, contributor: contributor} do
      conn = put(conn, Routes.admin_contributor_path(conn, :update, contributor), contributor: @update_attrs)
      assert redirected_to(conn) == Routes.admin_contributor_path(conn, :show, contributor)

      conn = get(conn, Routes.admin_contributor_path(conn, :show, contributor))
      assert html_response(conn, 200)
    end

    test "renders errors when data is invalid", %{conn: conn, contributor: contributor} do
      conn = put(conn, Routes.admin_contributor_path(conn, :update, contributor), contributor: @invalid_attrs)
      assert html_response(conn, 200) =~ "Edit Contributor"
    end
  end

  describe "delete contributor" do
    setup [:create_contributor]

    test "deletes chosen contributor", %{conn: conn, contributor: contributor} do
      conn = delete(conn, Routes.admin_contributor_path(conn, :delete, contributor))
      assert redirected_to(conn) == Routes.admin_contributor_path(conn, :index)
      assert_error_sent 404, fn ->
        get(conn, Routes.admin_contributor_path(conn, :show, contributor))
      end
    end
  end

  defp create_contributor(_) do
    contributor = fixture(:contributor)
    {:ok, contributor: contributor}
  end

  @email "contact@website.com"
  @password "123456789"
  @valid_user_params %{
    name: "Nathan",
    email: @email,
    password: @password,
    password_confirmation: @password
  }

  defp login_admin(%{conn: conn} = params) do
    # Create an admin user
    {:ok, _user} = Treelib.UserManager.register_admin_user(@valid_user_params)

    session_params = %{ session: %{email: @email, password: @password}}

    # Login
    admin_conn = post(conn, session_path(conn, :create, session_params))

    Map.replace!(params, :conn, admin_conn)
  end
end
