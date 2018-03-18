defmodule TreelibWeb.PhotoController do
  use TreelibWeb, :controller
  @moduledoc """
  Controller for retreiving photos
  """

  alias Treelib.PhotoManager

  def index(%Plug.Conn{params: %{"species_id" => id}} = conn, _params) do
    photos = PhotoManager.photos_for_species(id)
    
    render(conn, "index.json", photos: photos)
  end

  def index(%Plug.Conn{params: %{"genus_id" => id}} = conn, _params) do
    photos = PhotoManager.photos_for_genus(id, 10)
    
    render(conn, "index.json", photos: photos)
  end

  def index(%Plug.Conn{params: %{"family_id" => id}} = conn, _params) do
    photos = PhotoManager.photos_for_family(id, 10)
    
    render(conn, "index.json", photos: photos)
  end
end
