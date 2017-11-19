defmodule Flickr.API do
  @moduledoc """
  Flickr API Contract
  """

  @doc """
  Get photosets from flickr and decode the response

  Reference: https://www.flickr.com/services/api/flickr.photosets.getList.html
  """
  @callback get_photosets(arg :: any) :: %{optional(any) => any}


  @doc """
  Parse the response of a Flickr phoyoset request.
  """
  @callback parse_photosets_resp(flickr_response :: List.t) :: [%Flickr.Photoset{}]


  @doc """
  Returns photos of a photoset for a photoset_id

  Reference: https://www.flickr.com/services/api/flickr.photosets.getPhotos.html

  URL Structure:
  https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key={api_key}photoset_id={photoset_id}&user_id={user_id}&format=json&nojsoncallback=1
  """
  @callback get_photos_in_photoset(photoset_id :: Integer.t) :: map()
  @callback get_photos_in_photoset(photoset :: %Flickr.Photoset{}) :: map()


  @doc """
  For parsing the response of a Flickr
  photo request.
  """
  @callback parse_photo_resp(flickr_response :: List.t) :: [%Flickr.Photo{}]

end
