defmodule Treelib.Factory do
  @moduledoc """
  Defines factories for testing.
  """

  use ExMachina.Ecto, repo: Treelib.Repo

  alias Treelib.UserManager.User

  def user_factory do
    %User{
      name: "Jane Smith",
      email: sequence(:email, &"email-#{&1}@example.com"),
      pw_hash: "",
      # password: "password",
      # password_confirmation: "password",
      admin_level:  0,
      enabled: true,
    }
  end
end
