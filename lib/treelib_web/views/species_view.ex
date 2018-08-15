defmodule TreelibWeb.SpeciesView do
  use TreelibWeb, :view

  def render("index.json", %{species: species}) do
    species
  end
end
