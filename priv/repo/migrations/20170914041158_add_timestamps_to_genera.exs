defmodule Treelib.Repo.Migrations.AddTimestampsToGenera do
  use Ecto.Migration

  def change do
    alter table(:genera) do
      timestamps()
    end
  end
end
