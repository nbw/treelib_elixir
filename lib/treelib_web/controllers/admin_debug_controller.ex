defmodule TreelibWeb.AdminDebugController do
  use TreelibWeb, :controller

  @moduledoc """
  Controller for debug page
  """

  action_fallback AdminFallbackController

  def index(conn, _params) do
    with {:ok, _current_user} <- auth_admin(conn) do
      live_render(conn, TreelibWeb.AdminDebugLiveView)
    end
  end
end
