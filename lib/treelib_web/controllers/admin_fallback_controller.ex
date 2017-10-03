 defmodule AdminFallbackController do
  use Phoenix.Controller

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
end
