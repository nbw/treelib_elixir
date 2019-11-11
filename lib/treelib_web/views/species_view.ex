defmodule TreelibWeb.SpeciesView do
  use TreelibWeb, :view

  def render("index.json", %{species: species}) do
    species
  end

  def latin_name(%{genus_name: g_name, species_name: s_name}) do
    "#{g_name} #{s_name}"
  end

  def common_name(%{common_name: name}), do: name
end
