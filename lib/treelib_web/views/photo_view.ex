defmodule TreelibWeb.PhotoView do
  use TreelibWeb, :view

  alias Treelib.PhotoManager

  def render("index.json", %{photos: photos}) do
    Enum.map(photos, fn(p) ->
      PhotoManager.format_photo_for_web(p)
    end)
  end
end
