 defmodule AdminFallbackController do
  use Phoenix.Controller

  use TreelibWeb, :controller

  def call(conn, {:error, :not_logged_in}) do
    conn
    |> put_status(:unauthorized)
    |> redirect(to: "/login")
  end

  def call(conn, {:error, :non_admin}) do
    conn
    |> put_status(:forbidden)
    |> redirect(to: "/")
  end

  def call(conn, {:error, %Ecto.Changeset{} = changeset}) do
    conn
    |> put_status(:unprocessable_entity)
    |> render(TreelibWeb.ChangesetView, "error.json", changeset: changeset)
  end

  def call(conn, {:error, :not_found}) do
    conn
    |> put_status(:not_found)
    |> render(TreelibWeb.ErrorView, :"404")
  end
end
