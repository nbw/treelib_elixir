defmodule TreelibWeb.ContributorView do
  use TreelibWeb, :view
  alias Treelib.Taxonomy.Species
  alias Treelib.Taxonomy.Genus

  def search_species_path(id) do
    "/search?s=" <> Integer.to_string(id)
  end

  def species_name(%Species{ name: species_name, genus: %Genus{name: genus_name}}) do
    genus_name <> " " <> species_name
  end

end
