defmodule TreelibWeb.PageController do
  use TreelibWeb, :controller
  @moduledoc """
  Controller for static info pages: home, about, and contact
  """

  def home(conn, _params) do
    render conn, "index.html", page: "home"
  end

  def about(conn, _params) do
    render conn, "index.html", page: "about" 
  end

  def contact(conn, _params) do
    render conn, "index.html", page: "contact" 
  end
end
