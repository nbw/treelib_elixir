defmodule Treelib.Tasks.MissingAlbums do
  alias Treelib.Taxonomy.SpeciesManager
  alias Treelib.PhotoManager
  alias Treelib.Repo

  def process do
    IO.puts("[MA]: Starting")

    SpeciesManager.all
    |> SpeciesManager.with_genus
    |> Enum.each(fn s ->
      PhotoManager.get_album(s.album_id)
      |> case do
        nil -> find_and_link(s)
        # pa -> IO.puts("Album #{pa.id} found.")
      end
    end)

    IO.puts("[MA]: Done")
  end

  def find_and_link(species) do
    name = "#{species.genus.name} #{species.name}"

    # IO.puts("[MA]: Searching: #{name}")
    PhotoManager.get_album_by_name(name)
    |> case do
      nil -> IO.puts("--> Not found: #{name}")
      pa ->  SpeciesManager.update_species(species, %{ album_id: pa.id })
        # IO.puts("--> Found an album with name #{name}")
    end
  end

end
