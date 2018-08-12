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
            |> Map.update!(:id, &(String.to_integer(&1)))
            |> Map.update!(:date_update, &(format_date(&1)))
            |> Map.update!(:title, &(extract_title(&1)))

    struct(__MODULE__,attrs)
  end

  @doc """
  Maps Photoset to attrs for PhotoAlbum
  """
  def into_photo_album %Flickr.Photoset{} = photoset do
    %{photoset_id: photoset.id, name: photoset.title, last_updated: photoset.date_update, inserted_at: Timex.now, updated_at: Timex.now }
  end

  defp map_keys_as_atoms map do
    Map.new(map, fn {k, v} ->
      {String.to_existing_atom(k), v}
    end)
  end

  defp format_date date do
    date
    |> String.to_integer
    |> DateTime.from_unix!
  end

  defp extract_title title do
    title
    |> Map.fetch!("_content")
  end
end
