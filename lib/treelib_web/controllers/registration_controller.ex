defmodule TreelibWeb.RegistrationController do
  use TreelibWeb, :controller

  alias Treelib.UserManager
  alias Treelib.UserManager.User

  def new(conn, _params) do
    changeset = User.registration_changeset(%User{}, %{})
    render conn, "new.html", changeset: changeset
  end

  def create(conn, %{"user" => params}) do
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
  end
end
