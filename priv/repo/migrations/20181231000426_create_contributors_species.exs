defmodule Treelib.Repo.Migrations.CreateContributorsSpecies do
  use Ecto.Migration

  def change do
    create table(:contributors_species) do
      add :species_id, references(:species, on_delete: :delete_all)
      add :contributor_id, references(:contributors, on_delete: :delete_all)
    end
  end
end
