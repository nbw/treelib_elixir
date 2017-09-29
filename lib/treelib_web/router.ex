defmodule TreelibWeb.Router do
  use TreelibWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", TreelibWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :home
    get "/about", PageController, :about
    get "/contact", PageController, :contact

    get "/search", SearchController, :index
  end

  scope "/genus", TreelibWeb do
    # get ":id/photos", GenusController, :photo
  end


  # Other scopes may use custom stacks.
  scope "/api", TreelibWeb do
    pipe_through :api
    get "/photos", PhotoController, :index
  end
end
