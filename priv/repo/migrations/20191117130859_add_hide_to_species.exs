defmodule Treelib.Repo.Migrations.AddHideToSpecies do
  use Ecto.Migration

  def change do
    alter table(:species) do
      add :hide, :boolean, default: false
    end
  end
end
