defmodule TreelibWeb.SpeciesLiveView do
  use Phoenix.LiveView

  alias Treelib.Taxonomy.{
    SpeciesManager,
  }

  def render(assigns) do
    Phoenix.View.render(TreelibWeb.SpeciesView, "index.html", assigns)
  end

  def mount(_, socket) do
    species = SpeciesManager.species_list
              |> Enum.map(fn %{
                genus_name: g_n,
                genus_common_name: g_cn,
                species_name: s_n,
                species_common_name: s_cn} = species ->
                  Map.put(species, :searchable_string, String.downcase("#{g_cn} #{g_n} #{s_cn} #{s_n}"))
              end)

    {:ok, assign(socket, species: species, filtered_species: species, query: "")}
  end

  def handle_event("search", %{"search_field" => %{"query" => query}}, socket) do
    species = socket.assigns.species

    filtered_species = case query do
      "" -> species
      nil -> species
      q -> Enum.filter(species, fn %{searchable_string: s} ->
          String.contains?(s, String.downcase(query))
      end)
    end

    {:noreply, assign(socket, filtered_species: filtered_species, query: query)}
  end
end
