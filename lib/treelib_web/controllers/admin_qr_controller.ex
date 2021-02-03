defmodule TreelibWeb.AdminQrController do
  use TreelibWeb, :controller

  @moduledoc """
  Admin Controller for qr codes
  """

  alias Treelib.QR.QrManager

  def index(conn, _params) do
    with {:ok, _current_user} <- auth_admin(conn) do
      species = QrManager.species_with_code()
      render(conn, "index.html", species: species)
    end
  end
end
