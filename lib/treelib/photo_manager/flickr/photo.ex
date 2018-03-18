defmodule Flickr.Photo do
  @enforce_keys [ :id, :date_update ]
  defstruct [
    :farm,
    :id,
    :description,
    :photoset_id,
    :isfamily,
    :isfriend,
    :isprimary,
    :ispublic,
    :secret,
    :server,
    :title
  ]

  @doc """
  Creates a new Photo from a flickr response.

  # Example "flickr_photo"

    %{
      "farm" => 6,
      "id" => "31091742462",
      "isfamily" => 0,
      "isfriend" => 0,
      "isprimary" => "0",
      "ispublic" => 1,
      "secret" => "3f63cca59a",
      "server" => "5612",
      "title" => "Rhus typhina-12"
    }

  """
  def new(flickr_photo \\ %{}, photoset_id) do 
    attrs = map_keys_as_atoms(flickr_photo) 
            |> Map.put(:photoset_id, String.to_integer(photoset_id))
            |> Map.update!(:id, &(String.to_integer(&1)))
            |> Map.update!(:server, &(String.to_integer(&1)))
            |> Map.update!(:description, &(&1["_content"]))

    struct(__MODULE__, attrs)
  end

  @doc """
  Formats a Flickr.Photo for a Treelib.PhotoManager.Photo's
  changeset
  """
  def into_db_photo %Flickr.Photo{} = photo do
    %{
      flickr_id: photo.id,
      photoset_id: photo.photoset_id, 
      name: photo.title,
      farm: photo.farm,
      server: photo.server,
      secret: photo.secret,
      description: photo.description,
      inserted_at: Timex.now,
      updated_at: Timex.now
    }
  end
  
  @doc """
  Converts a map from string keys to atom keys.

  ## Example
    
    iex> map_keys_as_atoms(%{"name" => "Arbutus"})
    %{name: "Arbutus"}
  """
  defp map_keys_as_atoms map do
    Map.new(map, fn {k, v} -> 
      {String.to_existing_atom(k), v}
    end)
  end
end
