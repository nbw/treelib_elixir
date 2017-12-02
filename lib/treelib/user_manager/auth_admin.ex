defmodule Treelib.UserManager.AuthAdmin do
  @moduledoc """
  Responsible for checking admin status of a user.
  """
  alias Treelib.UserManager.User

  def auth_admin(%User{admin_level: level} = user) when level == true,
  	do: {:ok, user}

  def auth_admin(%User{admin_level: level}) when level != true,
  	do: {:error, :non_admin}

  def auth_admin(nil), 
  	do: {:error, :not_logged_in}

end
