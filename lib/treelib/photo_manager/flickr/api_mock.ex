defmodule Flickr.API.Mock do
  @behaviour Flickr.API

  @moduledoc """
  Flickr API Mock Client
  """

  def parse_photosets_resp flickr_response do

    flickr_response
    |> Map.fetch!("photosets")
    |> Map.fetch!("photoset")
    |> Enum.map(&(Flickr.Photoset.new(&1)))
  end

  def parse_photo_resp flickr_response do
    photoset_id =
      flickr_response
      |> Map.fetch!("photoset")
      |> Map.fetch!("id")

    flickr_response
    |> Map.fetch!("photoset")
    |> Map.fetch!("photo")
    |> Enum.map(&(Flickr.Photo.new(&1, photoset_id)))
  end

  def get_photosets(%{ok_date: ok_date, update_date: update_date} \\ %{ok_date: Timex.now, update_date: Timex.now}) do
    %{
      "photosets" => %{
        "page" => 1,
        "pages" => 1,
        "perpage" => 36,
        "photoset" => [
          %{ # new photoset
            "can_comment" => 0,
            "count_comments" => "0",
            "count_views" => "6",
            "date_create" => "1480120977",
            "date_update" => "1481058523",
            "description" => %{"_content" => ""},
            "farm" => 6,
            "id" => "7777",
            "needs_interstitial" => 0,
            "photos" => 15,
            "primary" => "30873961770",
            "secret" => "f71e1d46e9",
            "server" => "5601",
            "title" => %{"_content" => "Araucaria araucana "},
            "videos" => 0,
            "visibility_can_see_set" => 1},
          %{ # second new photoset
            "can_comment" => 0,
            "count_comments" => "0",
            "count_views" => "6",
            "date_create" => "1480120977",
            "date_update" => "1481058523",
            "description" => %{"_content" => ""},
            "farm" => 6,
            "id" => "8888",
            "needs_interstitial" => 0,
            "photos" => 15,
            "primary" => "30873961770",
            "secret" => "f71e1d46e9",
            "server" => "5601",
            "title" => %{"_content" => "Araucaria araucana "},
            "videos" => 0,
            "visibility_can_see_set" => 1},
          %{ # photoset to update
            "can_comment" => 0,
            "count_comments" => "0",
            "count_views" => "6",
            "date_create" => "1480120977",
            "date_update" => Integer.to_string(DateTime.to_unix(Timex.shift(update_date, hours: 1))),
            "description" => %{"_content" => ""},
            "farm" => 6,
            "id" => "72157673092712473",
            "needs_interstitial" => 0,
            "photos" => 15,
            "primary" => "30873961770",
            "secret" => "f71e1d46e9",
            "server" => "5601",
            "title" => %{"_content" => "Araucaria araucana "},
            "videos" => 0,
            "visibility_can_see_set" => 1},
          %{ # photoset to leave as is
            "can_comment" => 0,
            "count_comments" => "0",
            "count_views" => "0",
            "date_create" => "1480121126",
            "date_update" => Integer.to_string(DateTime.to_unix(ok_date)),
            "description" => %{"_content" => ""},
            "farm" => 6,
            "id" => "72157677069967095",
            "needs_interstitial" => 0,
            "photos" => 6,
            "primary" => "31097794712",
            "secret" => "fab1da026f",
            "server" => "5578",
            "title" => %{"_content" => "Araucaria heterophylla"},
            "videos" => 0,
            "visibility_can_see_set" => 1}
        ]
      }
    }

  end

  def get_photos_in_photoset(photoset_id) when is_integer(photoset_id) do

    photos = case Integer.to_string(photoset_id) do
      "31091742462" -> [
        %{
          "farm" => 6,
          "id" => "1111",
          "isfamily" => 0,
          "isfriend" => 0,
          "isprimary" => "0",
          "ispublic" => 1,
          "secret" => "3f63cca59a",
          "server" => "5612",
          "title" => "Rhus typhina-12",
          "description" => %{"_content" => ""}
        },
        %{
          "farm" => 6,
          "id" => "2222",
          "isfamily" => 0,
          "isfriend" => 0,
          "isprimary" => "0",
          "ispublic" => 1,
          "secret" => "118a651a21",
          "server" => "5801",
          "title" => "Rhus typhina-13",
          "description" => %{"_content" => ""}
        }]
      "7777" -> [
        %{ # new photos for new photoset
          "farm" => 6,
          "id" => "4343",
          "isfamily" => 0,
          "isfriend" => 0,
          "isprimary" => "0",
          "ispublic" => 1,
          "secret" => "118a651a21",
          "server" => "5801",
          "title" => "Pine Primary",
          "description" => %{"_content" => ""}
        },
        %{ # new photos for new photoset
          "farm" => 6,
          "id" => "3232",
          "isfamily" => 0,
          "isfriend" => 0,
          "isprimary" => "0",
          "ispublic" => 1,
          "secret" => "118a651a21",
          "server" => "5801",
          "title" => "Pine Secondary",
          "description" => %{"_content" => ""}
        }
      ]
      "8888" -> [
        %{ # new photos for new photoset
          "farm" => 6,
          "id" => "1212",
          "isfamily" => 0,
          "isfriend" => 0,
          "isprimary" => "0",
          "ispublic" => 1,
          "secret" => "118a651a21",
          "server" => "5801",
          "title" => "Pine Secondary",
          "description" => %{"_content" => ""}
        }
      ]
      "72157673092712473" -> [
        %{ # new photos for updated photoset
          "farm" => 6,
          "id" => "123123",
          "isfamily" => 0,
          "isfriend" => 0,
          "isprimary" => "0",
          "ispublic" => 1,
          "secret" => "118a651a21",
          "server" => "5801",
          "title" => "Pine Secondary",
          "description" => %{"_content" => ""}
        },
        %{ # new photos for updated photoset
          "farm" => 6,
          "id" => "321321",
          "isfamily" => 0,
          "isfriend" => 0,
          "isprimary" => "0",
          "ispublic" => 1,
          "secret" => "118a651a21",
          "server" => "5801",
          "title" => "Pine Secondary",
          "description" => %{"_content" => ""}
        }
      ]
      _ -> []
    end

    %{
      "photoset" => %{
        "id" => Integer.to_string(photoset_id),
        "owner" => "",
        "ownername" => "wbnathan",
        "page" => 1, "pages" => 1,
        "per_page" => 500,
        "perpage" => 500,
        "photo" => photos,
        "primary" => "",
        "title" => "",
        "total" => "24"
      },
      "stat" => "ok"
    }
  end

  def get_photos_in_photoset(%Flickr.Photoset{} = photoset) do
    get_photos_in_photoset(photoset.id)
  end
end
