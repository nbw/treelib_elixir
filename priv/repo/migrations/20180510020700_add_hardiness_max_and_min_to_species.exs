defmodule Treelib.Repo.Migrations.AddHardinessMaxAndMinToSpecies do
  use Ecto.Migration

  def change do
    alter table("species") do
      add :hardiness_min, :integer
      add :hardiness_max, :integer
    end
  end
end
