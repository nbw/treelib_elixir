defmodule Flickr.API do
  @moduledoc """
  Flickr API Client
  """

  alias Treelib.PhotoManager.PhotoAlbum

  alias Flickr.Parser
  alias Flickr.Client

  @base_url "https://api.flickr.com/services/rest/?"
  @api_key Application.get_env(:treelib, :flickr_api_key)
  @user_id Application.get_env(:treelib, :flickr_user_id)

  @doc """
  Reference: https://www.flickr.com/services/api/flickr.photosets.getList.html
  
  Structure:
    https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key={api_key}&user_id={user_id}&format=json&nojsoncallback=1

  """
  def get_photosets do
    flickr_url("flickr.photosets.getList")
    |> Client.get!
    |> Map.fetch!(:body)
    |> Parser.decode!
  end

  @doc """
  Returns photos of a photoset for a photoset_id

  Params
    photoset_id: [Integer]

  Reference: https://www.flickr.com/services/api/flickr.photosets.getPhotos.html

  URL Structure:
  https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key={api_key}photoset_id={photoset_id}&user_id={user_id}&format=json&nojsoncallback=1
  """
  def get_photos_in_photoset(photoset_id) when is_integer(photoset_id) do
    flickr_url("flickr.photosets.getPhotos", %{ photoset_id: photoset_id}) 
    |> IO.inspect
    |> Client.get!
    |> Map.fetch!(:body)
    |> Parser.decode!
  end

  @doc """
  Returns photos of a photoset for a %PhotoAlbum{}
  """
  def get_photos_in_photoset(%PhotoAlbum{ photoset_id: id}) do
    get_photos_in_photoset(id) 
  end

  @doc """
  Generates a Flickr API URL

  Params
    method: [String]
    opts: [Map]

  ## Examples
  
    iex> Flickr.API.flickr_url("flickr.photosets.getList")
    "https://api.flickr.com/services/rest/?api_key=flickr_test&format=json&method=flickr.photosets.getList&nojsoncallback=1&user_id=user_test"

    iex> Flickr.API.flickr_url("flickr.photosets.getPhotos", %{photoset_id: 1234})
    "https://api.flickr.com/services/rest/?api_key=flickr_test&format=json&method=flickr.photosets.getPhotos&nojsoncallback=1&photoset_id=1234&user_id=user_test"

  """
  def flickr_url(method, opts \\ %{}) do
    default_params = %{
      api_key: @api_key,
      format: "json",
      method: method,
      nojsoncallback: "1",
      user_id: @user_id
    }
    
    params = Map.merge(default_params, opts)

    @base_url <> URI.encode_query(params)
  end
end
