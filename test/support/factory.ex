defmodule Treelib.Factory do
  @moduledoc """
  Defines factories for testing.
  """

  use ExMachina.Ecto, repo: Treelib.Repo

  alias Treelib.UserManager.User
  alias Treelib.PhotoManager.Photo
  alias Treelib.PhotoManager.PhotoAlbum

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
      last_updated: ""
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
end
