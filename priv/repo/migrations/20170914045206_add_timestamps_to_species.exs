defmodule Treelib.Repo.Migrations.AddTimestampsToSpecies do
  use Ecto.Migration

  def change do
    alter table(:species) do
      timestamps()
    end
  end
end
