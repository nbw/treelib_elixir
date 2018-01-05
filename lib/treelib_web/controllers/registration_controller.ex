defmodule TreelibWeb.RegistrationController do
  use TreelibWeb, :controller

  alias Treelib.UserManager
  alias Treelib.UserManager.User

  def new(conn, _params) do
    with {:ok, "true"} <- Map.fetch(System.get_env(), "REGISTRATION_ENABLED") do
      changeset = User.registration_changeset(%User{}, %{})
      render conn, "new.html", changeset: changeset
    else
      _ -> redirect conn, to: "/"
    end
  end

  def create(conn, %{"user" => params}) do
    with {:ok, "true"} <- Map.fetch!(System.get_env(), "REGISTRATION_ENABLED") do
      case UserManager.register_admin_user(params) do
        {:ok, user} ->
          conn
          |> put_flash(:info, "Successfully registered a new account.")
          |> put_session(:current_user_id, user.id)
          |> configure_session(renew: true)
          |> redirect(to: "/login")
        {:error, %Ecto.Changeset{} = changeset} ->
          render conn, "new.html", changeset: changeset
      end
    else
      _ -> redirect conn, to: "/"
    end
  end
end
