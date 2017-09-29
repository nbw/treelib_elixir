require IEx
defmodule TreelibWeb.PhotoView do
  use TreelibWeb, :view
  alias Treelib.PhotoManager.PhotoBuilder

  def render("index.json", %{photos: photos}) do
    Enum.map(photos, fn(p) ->
      %{
        thumb: PhotoBuilder.photo_url(p, "q"),
        medium: PhotoBuilder.photo_url(p, "z"),
        original: PhotoBuilder.photo_url(p, "h"),
        name: p.name,
        description: p.description,
        flickr_url: ""
      }
    end)
  end
end
