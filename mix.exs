defmodule Treelib.Mixfile do
  use Mix.Project

  def project do
    [
      app: :treelib,
      version: "0.0.3",
      elixir: "~> 1.10.3",
      elixirc_paths: elixirc_paths(Mix.env()),
      compilers: [:phoenix, :gettext] ++ Mix.compilers(),
      start_permanent: Mix.env() == :prod,
      aliases: aliases(),
      deps: deps()
    ]
  end

  # Configuration for the OTP application.
  #
  # Type `mix help compile.app` for more information.
  def application do
    [
      mod: {Treelib.Application, []},
      extra_applications: [:logger, :runtime_tools, :httpoison, :timex, :sitemap]
    ]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "test/support"]
  defp elixirc_paths(_), do: ["lib"]

  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  defp deps do
    [
      {:phoenix, "~> 1.4.6"},
      {:phoenix_pubsub, "~> 1.1.2"},
      {:phoenix_ecto, "~> 4.0"},
      {:phoenix_live_view, "~> 0.4.1"},
      {:ecto_sql, "~> 3.3.2"},
      {:postgrex, ">= 0.14.3"},
      # {:mariaex, "~> 0.8.2"},
      {:phoenix_html, "~> 2.13.3"},
      {:phoenix_live_reload, "~> 1.2", only: :dev},
      {:gettext, "~> 0.11"},
      {:plug_cowboy, "~> 2.1"},
      # http client
      {:httpoison, "~> 1.2"},
      # json (included in phx too)
      {:poison, "~> 3.1"},
      # auth
      {:comeonin, "~> 5.0"},
      # encryption
      {:bcrypt_elixir, "~> 2.0"},
      # Dates and Time
      {:timex, "~> 3.6.1"},

      # Testing
      # fixtures for testing
      {:ex_machina, "~> 2.3", only: :test},
      {:flickrex, "~> 0.8"},
      {:sitemap, "~> 1.1"},
      # for seeds
      {:faker, "~> 0.12", only: [:dev, :test]}
    ]
  end

  # Aliases are shortcuts or tasks specific to the current project.
  # For example, to create, migrate and run the seeds file at once:
  #
  #     $ mix ecto.setup
  #
  # See the documentation for `Mix` for more info on aliases.
  defp aliases do
    [
      "ecto.setup": ["ecto.create", "ecto.migrate", "run priv/repo/seeds.exs"],
      "ecto.reset": ["ecto.drop", "ecto.setup"],
      test: ["ecto.create --quiet", "ecto.migrate", "test"]
    ]
  end
end
