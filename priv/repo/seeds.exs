# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Treelib.Repo.insert!(%Treelib.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.


alias Treelib.Repo
alias Treelib.UserManager.User

# USER
# Create an admin user with password 123456789
%User{admin_level: true}
|> User.admin_registration_changeset(%{
  email: "admin@treelib.ca",
  name: "Admin",
  password: "123456789",
  password_confirmation: "123456789",
  admin_level: true,
  enabled: true
})
|> Repo.insert!()
