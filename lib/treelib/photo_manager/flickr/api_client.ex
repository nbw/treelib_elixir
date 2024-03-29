defmodule Flickr.API.HTTPClient do
  @behaviour Flickr.API

  @moduledoc """
  Flickr API Client
  """

  alias Flickr.Photoset
  alias Flickr.Parser
  alias Flickr.Client

  @base_url "https://api.flickr.com/services/rest/?"
  @api_key Application.get_env(:treelib, :flickr_api_key)
  @user_id Application.get_env(:treelib, :flickr_user_id)
  @oauth_config [
    oauth_token: Application.get_env(:treelib, :flickr_oauth_token),
    oauth_token_secret: Application.get_env(:treelib, :flickr_oauth_token_secret)
  ]

  @doc """
  For parsing the response of a Flickr
  photoset request.

  @return: [List] of [%Photoset]
  """
  def parse_photosets_resp(flickr_response) do
    flickr_response
    |> Map.fetch!("photoset")
    |> Enum.map(&Flickr.Photoset.new(&1))
  end

  @doc """
  Reference: https://www.flickr.com/services/api/flickr.photosets.getList.html

  Structure:
    https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key={api_key}&user_id={user_id}&format=json&nojsoncallback=1

  """
  def get_photosets(opts \\ %{}) do
    flickr_url("flickr.photosets.getList", opts)
    |> Client.get!([], default_options())
    |> Map.fetch!(:body)
    |> Parser.decode!()
    |> Map.fetch!("photosets")
  end

  @doc """
  get_photosets that accounts for pages

  Also does the parsing
  """
  def get_all_photosets(photosets \\ [], page \\ 1) do
    # Response
    photosets_resp = get_photosets(%{page: page})

    # Current page and total pages
    page = Map.fetch!(photosets_resp, "page")
    pages = Map.fetch!(photosets_resp, "pages")

    IO.puts("[ Photoset ]: #{page}/#{pages}")

    # Photosets
    photosets = photosets ++ parse_photosets_resp(photosets_resp)

    if page < pages do
      get_all_photosets(photosets, page + 1)
    else
      photosets
    end
  end

  @doc """
  For parsing the response of a Flickr
  photo request.

  @return: [List] of [%Flickr.Photo]
  """
  def parse_photo_resp(map) when map == %{} do
    IO.puts("No photos to parse")
    []
  end

  def parse_photo_resp(flickr_response) do
    photoset_id =
      flickr_response
      |> Map.fetch!("photoset")
      |> Map.fetch!("id")

    flickr_response
    |> Map.fetch!("photoset")
    |> Map.fetch!("photo")
    |> Enum.map(&Flickr.Photo.new(&1, photoset_id))
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
    photoset_id
    |> Flickrex.Flickr.Photosets.get_photos(@user_id, extras: "description")
    |> Flickrex.request(@oauth_config)
    |> case do
      {:ok, resp} ->
        resp.body

      {:error, msg} ->
        IO.puts("Failed photo resync for photoset #{photoset_id}")
        IO.inspect(msg)
        %{}
    end
  end

  @doc """
  Returns photos of a photoset for a %PhotoAlbum{}
  """
  def get_photos_in_photoset(%Photoset{} = photoset) do
    get_photos_in_photoset(photoset.id)
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
    "https://api.flickr.com/services/rest/?api_key=flickr_test&format=json&method=flickr.photosets.getPhotos&nojsoncallback=1&photoset_id=1234&user_id=user_test&extras=description"

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

  defp default_options do
    # timeout after 10s
    [recv_timeout: 10000]
  end
end
