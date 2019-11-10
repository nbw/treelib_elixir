defmodule TreelibWeb.Router do
  use TreelibWeb, :router

  pipeline :browser do
    plug :accepts, ["html", "json"]
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

    get  "/register", RegistrationController, :new
    post "/register", RegistrationController, :create

    get    "/login",  SessionController, :new
    post   "/login",  SessionController, :create
    delete "/logout", SessionController, :delete

    resources "/family", FamilyController, except: [:index, :show]
    get "/family.json", FamilyController, :index
    get "/family/:id/:name", FamilyController, :show
    get "/family/:id", FamilyController, :show

    resources "/genus", GenusController, except: [:index, :show]
    get "/genus/:id/:name", GenusController, :show
    get "/genus/:id", GenusController, :show

    resources "/species", SpeciesController, except: [:index, :show]
    get "/species.json", SpeciesController, :index
    get "/species/:id/:name", SpeciesController, :show
    get "/species/:id", SpeciesController, :show

    get "/photo_album.json", PhotoAlbumController, :index

    get "/contributors", ContributorController, :index
  end

  scope "/", TreelibWeb do
    get "/sitemap.xml", SitemapController, :sitemap
    get "/sitemaps/sitemap.xml", SitemapController, :sitemap
    get "/sitemaps/sitemap1.xml", SitemapController, :sitemap1
  end

  scope "/api", TreelibWeb do
    pipe_through :api

    get "/photos", PhotoController, :index
  end

  scope "/admin", TreelibWeb do
    pipe_through :browser

    get "/", AdminController, :index
    get "/oauth", OAuthController, :index
    post "/oauth/access_token", OAuthController, :access_token
    post "/refresh", AdminController, :refresh
    resources "/contributors", AdminContributorController
  end
end
