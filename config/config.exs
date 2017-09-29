# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :treelib,
  ecto_repos: [Treelib.Repo]

# Configures the endpoint
config :treelib, TreelibWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "ff/IyKIkmkeEqVWnt8/eDJUvxnJy41twFU3YwF1gyfk/k3Un7yX1+0Rlz4+GOFew",
  render_errors: [view: TreelibWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Treelib.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
