defmodule TreelibWeb.PhotoAlbumView do
  use TreelibWeb, :view

  def render("index.json", %{albums: albums}) do
    render_many(albums, TreelibWeb.PhotoAlbumView, "album.json", as: :album)
  end

  def render("album.json", %{album: album}) do
    %{
      id: album.id,
      photoset_id: album.photoset_id,
      name: album.name
    }
  end
end
