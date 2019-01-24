require IEx
defmodule TreelibWeb.OAuthController do
  use TreelibWeb, :controller
  @moduledoc """
  Controller for oauth pages
  """

  def index(conn, _params) do
    with {:ok, _current_user} <- auth_admin(conn),
         {:ok, %{body: request}} <- request_token,
         {:ok, auth_url} <- request_auth_url(request)
    do
      render conn, "index.html", url: auth_url, oauth_token: request.oauth_token, oauth_token_secret: request.oauth_token_secret
    end
  end

  def access_token(conn, %{
    "oauth_token" => oauth_token,
    "oauth_token_secret" => oauth_token_secret,
    "token" => token}) do
    with {:ok, _current_user} <- auth_admin(conn) do
        oauth_token
        |> Flickrex.Auth.access_token(oauth_token_secret, token)
        |> Flickrex.request()
        |> case do
          {:ok, %{body: access}} ->
            render conn, "tokens.html", oauth_token: access.oauth_token, oauth_token_secret: access.oauth_token_secret
          {:error, resp } ->
            conn
            |> redirect(to: "/admin/oauth")
        end
    end
  end

  defp request_auth_url request do
    request.oauth_token
    |> Flickrex.Auth.authorize_url()
    |> Flickrex.request()
  end

  defp request_token do
    Flickrex.Auth.request_token() |> Flickrex.request()
  end
end


