defmodule TreelibWeb.AdminContributorController do
  use TreelibWeb, :controller

  alias Treelib.Contributions
  alias Treelib.Contributions.Contributor

  action_fallback AdminFallbackController

  def index(conn, _params) do
    with {:ok, _current_user} <- auth_admin(conn) do
      contributors = Contributions.list_contributors()
      render(conn, "index.html", contributors: contributors)
    else
      {:error, _ } -> redirect conn, to: Routes.search_path(conn, :index)
    end
  end

  def new(conn, _params) do
    with {:ok, _current_user} <- auth_admin(conn) do
      contributor =
        %Contributor{}
        |> Treelib.Repo.preload([species: [:genus]])

      changeset = Contributions.change_contributor(contributor)
      render(conn, "new.html", contributor: contributor, changeset: changeset)
    else
      {:error, _ } -> redirect conn, to: Routes.search_path(conn, :index)
    end
  end

  def create(conn, %{"contributor" => contributor_params}) do
    with {:ok, _current_user} <- auth_admin(conn) do
      case Contributions.create_contributor(contributor_params) do
        {:ok, _contributor} ->
          conn
          |> put_flash(:info, "Contributor created successfully.")
          |> redirect(to: Routes.admin_contributor_path(conn, :index))

        {:error, %Ecto.Changeset{} = changeset} ->
          contributor =
            %Contributor{}
            |> Treelib.Repo.preload([species: [:genus]])
          render(conn, "new.html", contributor: contributor, changeset: changeset)
      end
    else
      {:error, _ } -> redirect conn, to: Routes.search_path(conn, :index)
    end
  end

  def show(conn, %{"id" => id}) do
    with {:ok, _current_user} <- auth_admin(conn) do
      contributor = Contributions.get_contributor!(id)
      render(conn, "show.html", contributor: contributor)
    else
      {:error, _ } -> redirect conn, to: Routes.search_path(conn, :index)
    end
  end

  def edit(conn, %{"id" => id}) do
    with {:ok, _current_user} <- auth_admin(conn) do
      contributor = Contributions.get_contributor!(id)
      changeset   = Contributions.change_contributor(contributor)

      render(conn, "edit.html", contributor: contributor, changeset: changeset)
    else
      {:error, _ } -> redirect conn, to: Routes.search_path(conn, :index)
    end
  end

  def update(conn, %{"id" => id, "contributor" => contributor_params}) do
    with {:ok, _current_user} <- auth_admin(conn) do
      contributor = Contributions.get_contributor!(id)

      contributor_params = maybe_set_empty_species(contributor_params)

      case Contributions.update_contributor(contributor, contributor_params) do
        {:ok, contributor} ->
          conn
          |> put_flash(:info, "Contributor updated successfully.")
          |> redirect(to: Routes.admin_contributor_path(conn, :show, contributor))

        {:error, %Ecto.Changeset{} = changeset} ->
          contributor = contributor |> Treelib.Repo.preload(:species)
          render(conn, "edit.html", contributor: contributor, changeset: changeset)
      end
    else
      {:error, _ } -> redirect conn, to: Routes.search_path(conn, :index)
    end
  end

  def delete(conn, %{"id" => id}) do
    with {:ok, _current_user} <- auth_admin(conn) do
      contributor = Contributions.get_contributor!(id)
      {:ok, _contributor} = Contributions.delete_contributor(contributor)

      conn
      |> put_flash(:info, "Contributor deleted successfully.")
      |> redirect(to: Routes.admin_contributor_path(conn, :index))
    else
      {:error, _ } -> redirect conn, to: Routes.search_path(conn, :index)
    end
  end

  defp maybe_set_empty_species(%{"species_ids" => _ } = params), do: params

  # If no species_ids are passed, assume the user has removed
  # any associated species from the contributor
  defp maybe_set_empty_species params do
    params
    |> Map.put("species_ids", [])
  end

end
