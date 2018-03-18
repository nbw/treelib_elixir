use Mix.Config


# For development, we disable any cache and enable
# debugging and code reloading.
#
# The watchers configuration can be used to run external
# watchers to your application. For example, we use it
# with brunch.io to recompile .js and .css sources.
config :treelib, TreelibWeb.Endpoint,
  http: [port: 4000],
  debug_errors: true,
  code_reloader: true,
  check_origin: false,
  watchers: [npm: ["run", "watch", cd: Path.expand("../assets", __DIR__)]]
  # watchers: [node: ["node_modules/brunch/bin/brunch", "watch", "--stdin",
  #                   cd: Path.expand("../assets", __DIR__)]]
  # watchers: [
  #   node: ["node_modules/.bin/webpack-dev-server", "--inline", "--colors", "--hot", "--stdin", "--host", "localhost", "--port", "8080", "--public", "localhost:8080",
  #          cd: Path.expand("../assets", __DIR__)
  #   ]]

# ## SSL Support
#
# In order to use HTTPS in development, a self-signed
# certificate can be generated by running the following
# command from your terminal:
#
#     openssl req -new -newkey rsa:4096 -days 365 -nodes -x509 -subj "/C=US/ST=Denial/L=Springfield/O=Dis/CN=www.example.com" -keyout priv/server.key -out priv/server.pem
#
# The `http:` config above can be replaced with:
#
#     https: [port: 4000, keyfile: "priv/server.key", certfile: "priv/server.pem"],
#
# If desired, both `http:` and `https:` keys can be
# configured to run both http and https servers on
# different ports.

# Watch static and templates for browser reloading.
config :treelib, TreelibWeb.Endpoint,
  live_reload: [
    patterns: [
      ~r{priv/static/.*(js|css|png|jpeg|jpg|gif|svg)$},
      ~r{priv/gettext/.*(po)$},
      ~r{lib/treelib_web/views/.*(ex)$},
      ~r{lib/treelib_web/templates/.*(eex)$}
    ]
  ]

# Do not include metadata nor timestamps in development logs
config :logger, :console, format: "[$level] $message\n"

# Set a higher stacktrace during development. Avoid configuring such
# in production as building large stacktraces may be expensive.
config :phoenix, :stacktrace_depth, 20

# # MYSQL Configure your database
# config :treelib, Treelib.Repo,
#   adapter: Ecto.Adapters.MySQL,
#   username: "root",
#   password: "mysql",
#   database: "treelib_dev",
#   hostname: "localhost",
#   pool_size: 10

# Configure your database
config :treelib, Treelib.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "treelib_dev",
  hostname: "localhost",
  pool_size: 10,
  timeout: String.to_integer(System.get_env("DATABASE_TIMEOUT") || 45_000)


  # General Config
  config :treelib, 
  flickr_api_key: "FLICKR_KEY",
  flickr_user_id: "FLICKR_USER_ID" # overridden in secret

# Which API Client to use
config :treelib, :flickr_api, Flickr.API.HTTPClient

# Dev secret overrides Flickr API keys!
import_config "dev.secret.exs"
