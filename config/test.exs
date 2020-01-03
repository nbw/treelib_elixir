use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :treelib, TreelibWeb.Endpoint,
  http: [port: 4001],
  server: false,
  live_view: [
    signing_salt: "SECRET_SALT"
  ]

# Print only warnings and errors during test
config :logger, level: :warn


# Configure your database
config :treelib, Treelib.Repo,
  username: "postgres",
  password: "postgres",
  database: "treelib_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox

# General Config
config :treelib,
  flickr_api_key: "flickr_test",
  flickr_user_id: "user_test"

# Which API Client to use
config :treelib, :flickr_api, Flickr.API.Mock
