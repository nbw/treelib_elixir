defmodule Treelib.PhotoManager.PhotoBuilder do
  @moduledoc """
  Builds Flickr photo urls
  """

  alias Treelib.PhotoManager.Photo

  @sizes [ 
    "s",  #  small square 75x75
    "q",  #  large square 150x150
    "t",  #  thumbnail, 100 on longest side
    "m",  #  small, 240 on longest side
    "n",  #  small, 320 on longest side
    "",   #  medium, 500 on longest side
    "z",  #  medium 640, 640 on longest side
    "c",  #  medium 800, 800 on longest side
    "b",  #  large, 1024 on longest side
    "h",  #  large 1600, 1600 on longest side
    "k",  #  large 2048, 2048 on longest side
    "o"   #  original image, either a jpg, gif or png, depending on source format
  ]

  @doc """
  Checks if the specified size is valid.

  Reference: https://www.flickr.com/services/api/misc.urls.html

  ## Examples
  
  iex> Treelib.PhotoManager.PhotoBuilder.valid_size? "s"
  true

  iex> Treelib.PhotoManager.PhotoBuilder.valid_size? "y"
  false
  """
  def valid_size? s do
    Enum.member?(@sizes, s)
  end

  @doc """
  Checks if the specified size is valid.

  Reference: https://www.flickr.com/services/api/misc.urls.html

  ## Examples
  iex>  photo = %Treelib.PhotoManager.Photo{farm: 1, flickr_id: 2, photoset_id: 1, secret: "cats", server: 420}
  iex> Treelib.PhotoManager.PhotoBuilder.photo_url(photo, "s")
  "https://farm1.staticflickr.com/420/2_cats_s.jpg"

  iex>  photo = %Treelib.PhotoManager.Photo{farm: 1, flickr_id: 2, photoset_id: 1, secret: "cats", server: 420}
  iex> Treelib.PhotoManager.PhotoBuilder.photo_url(photo, "")
  "https://farm1.staticflickr.com/420/2_cats.jpg"
  """
  def photo_url(%Photo{} = photo, size) do
    case {valid_size?(size), size} do
      { true, ""}   -> "https://farm#{photo.farm}.staticflickr.com/#{photo.server}/#{photo.flickr_id}_#{photo.secret}.jpg"
      { true, size} -> "https://farm#{photo.farm}.staticflickr.com/#{photo.server}/#{photo.flickr_id}_#{photo.secret}_#{size}.jpg"
      { false, _ }  -> raise Treelib.PhotoManager.PhotoBuilder.SizeError, size
    end
  end
end

defmodule Treelib.PhotoManager.PhotoBuilder.SizeError do
  @moduledoc false

  defexception [:message]

  def exception(value) do
    msg = "Invalid Flickr size: '#{value}'. Refer to https://www.flickr.com/services/api/misc.urls.html"
    %Treelib.PhotoManager.PhotoBuilder.SizeError{message: msg}
  end
end

