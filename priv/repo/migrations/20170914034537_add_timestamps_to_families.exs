defmodule Treelib.Repo.Migrations.AddTimestampsToFamilies do
  use Ecto.Migration

  def change do
    alter table(:families) do
      timestamps()
    end
  end
end
