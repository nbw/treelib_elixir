defmodule TreelibWeb.AdminContributorView do
  use TreelibWeb, :view

  alias Treelib.Taxonomy

  defp formatted_species_list do
    Taxonomy.get_species_list()
    |> Enum.map(fn s ->
      {"#{s[:genus_name]} #{s[:name]}", s[:id]}
    end)
  end
end
