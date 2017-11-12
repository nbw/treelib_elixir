defmodule Flickr.Photoset do
  @enforce_keys [ :id, :date_update ]
  defstruct [
    :id,
    :farm,
    :photos,
    :primary,
    :secret,
    :server,
    :title,
    :can_comment,
    :count_comments,
    :count_views,
    :date_create,
    :date_update,
    :description,
    :needs_interstitial,
    :videos,
    :visibility_can_see_set
  ]

  @doc """
  Creates a new Photoset from a flickr response.

  # Example "flickr_photoset"

    %{
      "id" => "72157677069967095",
      "date_update" => "1480120977,
      ...
    }

  """
  def new(flickr_photoset \\ %{}) do 
    attrs = map_keys_as_atoms(flickr_photoset) 
    
    struct(__MODULE__,attrs)
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
