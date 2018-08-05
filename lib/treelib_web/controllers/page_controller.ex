defmodule TreelibWeb.PageController do
  use TreelibWeb, :controller
  @moduledoc """
  Controller for static info pages: home, about, and contact
  """

  def home(conn, _params) do
    render conn, "home.html"
  end

  def about(conn, _params) do
    render conn, "about.html"
  end

  def contact(conn, _params) do
    render conn, "contact.html"
  end
end
