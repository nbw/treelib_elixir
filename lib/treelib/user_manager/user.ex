defmodule Treelib.UserManager.User do
  use Ecto.Schema
  import Ecto.Changeset
  import Comeonin.Bcrypt, only: [hashpwsalt: 1]
  alias Treelib.UserManager.User


  schema "users" do
    field :email, :string
    field :name, :string
    field :pw_hash, :string
    field :admin_level, :boolean
    field :enabled, :boolean

    field :password, :string, virtual: true
    field :password_confirmation, :string, virtual: true

    timestamps()
  end

  @doc false
  def changeset(%User{} = user, attrs) do
    user
    |> cast(attrs, [:name, :email])
    |> validate_required([:name, :email])
    |> unique_constraint(:email)
  end

  @doc false
  def registration_changeset(%User{} = user, attrs \\ %{}) do
    user
    |> cast(attrs, [:name, :email, :password, :password_confirmation])
    |> validate_required([:name, :email, :password, :password_confirmation])
    |> update_change(:email, &String.downcase/1)
    |> validate_format(:email, ~r/@/)
    |> validate_length(:password, min: 6)
    |> validate_confirmation(:password, message: "must match password")
    |> unique_constraint(:email)
    |> maybe_hash_password()
  end

  def admin_registration_changeset(%User{} = user, attrs \\ %{}) do
    registration_changeset(user, attrs)
    |> cast(attrs, [:admin_level])
    |> validate_required([:admin_level])
  end

  defp maybe_hash_password(%{valid?: true, changes: %{password: password}} = changeset),
  do: put_change(changeset, :pw_hash, hashpwsalt(password))
  defp maybe_hash_password(changeset),
  do: changeset
end
