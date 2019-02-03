defmodule Treelib.Factory do
  @moduledoc """
  Defines factories for testing.
  """

  use ExMachina.Ecto, repo: Treelib.Repo

  alias Treelib.UserManager.User
  alias Treelib.PhotoManager.Photo
  alias Treelib.PhotoManager.PhotoAlbum
  alias Treelib.Taxonomy.Species
  alias Treelib.Taxonomy.Genus
  alias Treelib.Taxonomy.Family

  def user_factory do
    %User {
      name: "Jane Smith",
      email: sequence(:email, &"email-#{&1}@example.com"),
      pw_hash: "",
      # password: "password",
      # password_confirmation: "password",
      admin_level:  0,
      enabled: true,
    }
  end

  def photo_album_factory do
    %PhotoAlbum {
      photoset_id: 0,
      name: "Pine",
      last_updated: Timex.now
    }
  end

  def photo_factory do
    %Photo {
      flickr_id: 0,
      photoset_id: 1,
      photoset_id: 0,
      name: "Pine",
      description: "",
      credit: "",
      farm: 1,
      secret: "",
      server: 2,
    }
  end

  @doc """
  Returns a Species

  Note: Requries a genus

  # Example
    f = insert(:family, %{})
    g = insert(:genus, %{family: f})
    a = insert(:album, %{})
    s = insert(:species, %{genus: g, album: a})
  """
  def species_factory do
    %Species {
      name: "balsamea",
      common_name: "Balsam fir",
      description: "",
      enabled: true,
    }
  end

  @doc """
  Returns a Genus

  Note: Requries a family

  # Example
    f = insert(:family, %{})
    g = insert(:genus, %{family: f})
  """
  def genus_factory do
    %Genus {
      name: "Family",
      common_name: "My Family",
      description: "",
      enabled: true,
    }
  end

  def family_factory do
    %Family {
      name: "Family",
      common_name: "My Family",
      description: "",
      enabled: true,
    }
  end
end
