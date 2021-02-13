require IEx

defmodule TreelibWeb.QrController do
  use TreelibWeb, :controller

  @moduledoc """
  Controller for qr codes
  """

  alias Treelib.QR.QrManager
  alias Treelib.QR.Code
  alias Treelib.Taxonomy.SpeciesManager

  def create(%{params: %{"species_id" => id}} = conn, _params) do
    with {:ok, _current_user} <- auth_admin(conn),
         {:ok, species} <- SpeciesManager.get_species(id) do
      {:ok, code} = QrManager.create_code(species)
      render(conn, "create.json", code: code)
    end
  end

  def show(%{params: %{"id" => id}} = conn, _params) do
    {:ok, code} =
      QrManager.get_code!(id)
      |> QrManager.increment_count()

    conn
    |> redirect(to: redirect_url(code))
  end

  defp redirect_url(%Code{type_id: id, type: "species"}) do
    "/search?s=#{id}&closed=1"
  end

  defp redirect_url(_) do
    "/"
  end
end
