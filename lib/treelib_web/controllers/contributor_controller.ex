defmodule TreelibWeb.ContributorController do
  use TreelibWeb, :controller

  alias Treelib.Contributions
  alias Treelib.Contributions.Contributor

  def index(conn, _params) do
    contributors = Contributions.list_contributors()
    render(conn, "index.html", contributors: contributors)
  end

  def new(conn, _params) do
    contributor =
      %Contributor{}
      |> Treelib.Repo.preload(:species)

    changeset = Contributions.change_contributor(contributor)
    render(conn, "new.html", contributor: contributor, changeset: changeset)
  end

  def create(conn, %{"contributor" => contributor_params}) do
    case Contributions.create_contributor(contributor_params) do
      {:ok, contributor} ->
        conn
        |> put_flash(:info, "Contributor created successfully.")
        |> redirect(to: Routes.contributor_path(conn, :index))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    contributor = Contributions.get_contributor!(id)
    render(conn, "show.html", contributor: contributor)
  end

  def edit(conn, %{"id" => id}) do
    contributor = Contributions.get_contributor!(id)
    changeset   = Contributions.change_contributor(contributor)

    render(conn, "edit.html", contributor: contributor, changeset: changeset)
  end

  def update(conn, %{"id" => id, "contributor" => contributor_params}) do
    contributor = Contributions.get_contributor!(id)

    case Contributions.update_contributor(contributor, contributor_params) do
      {:ok, contributor} ->
        conn
        |> put_flash(:info, "Contributor updated successfully.")
        |> redirect(to: Routes.contributor_path(conn, :show, contributor))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", contributor: contributor, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    contributor = Contributions.get_contributor!(id)
    {:ok, _contributor} = Contributions.delete_contributor(contributor)

    conn
    |> put_flash(:info, "Contributor deleted successfully.")
    |> redirect(to: Routes.contributor_path(conn, :index))
  end

end
