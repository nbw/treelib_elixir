defmodule Treelib.Tasks.MissingAlbums do
  alias Treelib.Taxonomy.SpeciesManager
  alias Treelib.PhotoManager

  @spec process :: [String.t()]
  def process do
    IO.puts("[MA]: Starting")

    SpeciesManager.all()
    |> SpeciesManager.with_genus()
    |> Stream.map(fn s ->
      PhotoManager.get_album(s.album_id)
      |> case do
        nil -> find_and_link(s)
        _pa -> :ok
      end
    end)
    |> Stream.filter(fn s ->
      case s do
        {:error, _name} -> true
        :ok -> false
      end
    end)
    |> Stream.map(fn {:error, name} ->
      name
    end)
    |> Enum.sort()
  end

  defp find_and_link(species) do
    name = "#{species.genus.name} #{species.name}"

    # IO.puts("[MA]: Searching: #{name}")
    PhotoManager.get_album_by_name(name)
    |> case do
      nil ->
        IO.puts("--> Not found: #{name}")
        {:error, name}

      pa ->
        SpeciesManager.update_species(species, %{album_id: pa.id})
        :ok
        # IO.puts("--> Found an album with name #{name}")
    end
  end
end
