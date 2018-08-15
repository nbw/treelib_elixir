defmodule TreelibWeb.FamilyView do
  use TreelibWeb, :view

  def render("index.json", %{families: families}) do
    families
  end
end
