defmodule TreelibWeb.SpeciesView do
  use TreelibWeb, :view

  def render("index.json", %{species: species}) do
    species
  end

  def latin_name(%{genus_name: g_name, species_name: s_name}), do: "#{g_name} #{s_name}"

  def common_name(%{genus_common_name: g_name, species_common_name: s_name}), do: "#{s_name} #{g_name}"

  def bold_query(name, ""), do: name
  def bold_query(name, nil), do: name
  def bold_query(name, query) do
    String.replace(name,  Regex.compile!(query, "i"), "<b>\\0</b>")
    |> Phoenix.HTML.raw()
  end
end
