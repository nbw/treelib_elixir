defmodule TreelibWeb.AdminUrlQrController do
  use TreelibWeb, :controller

  @moduledoc """
  Admin Controller for qr codes
  """

  action_fallback(AdminFallbackController)

  def show(conn, %{"url" => url}) do
    conn
    |> render("show.html", url: url)
  end

  def create(conn, %{"qr_url" => %{"url" => url}} = params) do
    redirect(conn, to: Routes.admin_url_qr_path(TreelibWeb.Endpoint, :show, url: url))
  end
end
