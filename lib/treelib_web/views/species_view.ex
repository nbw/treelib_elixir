defmodule TreelibWeb.SpeciesView do
  use TreelibWeb, :view

  def render("index.json", %{species: species}) do
    species
  end

  def latin_name(%{genus_name: g_name, species_name: s_name}), do: "#{g_name} #{s_name}"

  def common_name(%{genus_common_name: g_name, species_common_name: s_name}), do: "#{s_name} #{g_name}"
end
