defmodule Flickr.Photoset do
  import Helpers.DateHelper

  @keys [
    :id,
    :farm,
    :photos,
    :primary,
    :secret,
    :server,
    :title,
    :can_comment,
    :count_comments,
    :count_photos,
    :count_videos,
    :count_views,
    :date_create,
    :date_update,
    :description,
    :owner,
    :needs_interstitial,
    :username,
    :videos,
    :visibility_can_see_set
  ]


  @enforce_keys [ :id, :date_update ]
  defstruct @keys

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
    %{
      photoset_id: photoset.id,
      name: photoset.title,
      last_updated: photoset.date_update,
      inserted_at: naive_now(),
      updated_at: naive_now()
    }
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
