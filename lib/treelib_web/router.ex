defmodule TreelibWeb.Router do
  use TreelibWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug TreelibWeb.CurrentUser
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", TreelibWeb do
    pipe_through :browser

    get "/", PageController, :home
    get "/about", PageController, :about
    get "/contact", PageController, :contact

    get "/search", SearchController, :index

    get "/register", RegistrationController, :new
    post "/register", RegistrationController, :create

    get "/login", SessionController, :new
    post "/login", SessionController, :create
    delete "/logout", SessionController, :delete
  end

  # scope "/genus", TreelibWeb do
  #   get ":id/edit", GenusController, :photo
  # end

  scope "/family", TreelibWeb do
    pipe_through :browser

    get ":id/edit", FamilyController, :edit
  end

  scope "/api", TreelibWeb do
    pipe_through :api
    get "/photos", PhotoController, :index
  end

  scope "/admin", TreelibWeb do
    pipe_through :browser

    get "/", AdminController, :index
  end
end
