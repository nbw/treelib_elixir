import Config

# Do not print debug messages in production
config :logger, level: :info

# Which API Client to use
config :treelib, :flickr_api, Flickr.API.HTTPClient

# ## SSL Support
#
# To get SSL working, you will need to add the `https` key
# to the previous section and set your `:url` port to 443:
#
#     config :treelib, TreelibWeb.Endpoint,
#       ...
#       url: [host: "example.com", port: 443],
#       https: [:inet6,
#               port: 443,
#               keyfile: System.get_env("SOME_APP_SSL_KEY_PATH"),
#               certfile: System.get_env("SOME_APP_SSL_CERT_PATH")]
#
# Where those two env variables return an absolute path to
# the key and cert in disk or a relative path inside priv,
# for example "priv/ssl/server.key".
#
# We also recommend setting `force_ssl`, ensuring no data is
# ever sent via http, always redirecting to https:
#
#     config :treelib, TreelibWeb.Endpoint,
#       force_ssl: [hsts: true]
#
# Check `Plug.SSL` for all available options in `force_ssl`.

# ## Using releases
#
# If you are doing OTP releases, you need to instruct Phoenix
# to start the server for all endpoints:
#
#     config :phoenix, :serve_endpoints, true
#
# Alternatively, you can configure exactly which server to
# start per endpoint:
#
#     config :treelib, TreelibWeb.Endpoint, server: true
#

######################################
# Heroku Config
# config :treelib, TreelibWeb.Endpoint,
#   load_from_system_env: true,
#   url: [scheme: "https", host: "treelib.ca", port: 443],
#   force_ssl: [rewrite_on: [:x_forwarded_proto]],
#   cache_static_manifest: "priv/static/cache_manifest.json",
#   secret_key_base: Map.fetch!(System.get_env(), "SECRET_KEY_BASE"),
#   live_view: [
#     signing_salt: Map.fetch!(System.get_env(), "SECRET_KEY_BASE"),
#   ]


# Configure your database
# config :treelib, Treelib.Repo,
#   url: System.get_env("DATABASE_URL"),
#   pool_size: String.to_integer(System.get_env("POOL_SIZE") || "10"),
#   ssl: true,
#   timeout: String.to_integer(System.get_env("DATABASE_TIMEOUT") || 15_000)

# Flickr
# config :treelib,
#   flickr_api_key: System.get_env("FLICKR_API_KEY"),
#   flickr_user_id: System.get_env("FLICKR_USER_ID"),
#   flickr_oauth_token: System.get_env("FLICKR_OAUTH_TOKEN"),
#   flickr_oauth_token_secret: System.get_env("FLICKR_OAUTH_TOKEN_SECRET")

# config :flickrex, :config, [
#   consumer_key:    System.get_env("FLICKR_API_KEY"),
#   consumer_secret: System.get_env("FLICKR_SECRET")
# ]
