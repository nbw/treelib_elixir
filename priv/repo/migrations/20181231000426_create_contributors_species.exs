defmodule Treelib.Repo.Migrations.CreateContributorsSpecies do
  use Ecto.Migration

  def change do
    create table(:contributors_species) do
      add :species_id, references(:species)
      add :contributor_id, references(:contributors)
    end
  end
end
