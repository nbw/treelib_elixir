defmodule Treelib.Repo.Migrations.CreateContributors do
  use Ecto.Migration

  def change do
    create table(:contributors) do
      add :first_name, :string
      add :last_name, :string
      add :description, :string
      add :enabled, :boolean, default: true

      timestamps()
    end
  end
end
