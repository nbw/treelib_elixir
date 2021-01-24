require IEx

defmodule TreelibWeb.QrController do
  use TreelibWeb, :controller

  @moduledoc """
  Controller for qr codes
  """

  alias Treelib.QR.QrManager
  alias Treelib.Taxonomy.SpeciesManager

  def create(%{params: %{"species_id" => id}} = conn, _params) do
    with {:ok, _current_user} <- auth_admin(conn),
         {:ok, species} <- SpeciesManager.get_species(id) do
      {:ok, code} = QrManager.create_code(species)
      render(conn, "create.json", code: code)
    end
  end
end
