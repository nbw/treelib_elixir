defmodule Treelib.Repo.Migrations.AddHardinessTypesToSpecies do
  use Ecto.Migration

  def change do
    alter table("species") do
      add :hardiness_min_type, :string
      add :hardiness_max_type, :string
    end

  end
end
