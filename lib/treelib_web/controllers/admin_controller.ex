defmodule TreelibWeb.AdminController do
  use TreelibWeb, :controller
  @moduledoc """
  Controller for admin pages
  """

  action_fallback AdminFallbackController

  def index(conn, _params) do
    with {:ok, _current_user} <- auth_admin(conn) do 
      render conn, "index.html"
    end
  end
end

