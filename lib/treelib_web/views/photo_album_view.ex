defmodule TreelibWeb.PhotoAlbumView do
  use TreelibWeb, :view

  def render("index.json", %{albums: albums}) do
    Enum.map(albums, &json_album/1)
  end

  defp json_album(album) do
    %{
      id: album.id,
      photoset_id: album.photoset_id,
      name: album.name
    }
  end
end
