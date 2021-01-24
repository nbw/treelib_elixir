defmodule Treelib.Repo.Migrations.CreateQrCodes do
  use Ecto.Migration

  def change do
    create table(:qr_codes) do
      add :type, :string
      add :type_id, :id
      add :enabled, :boolean, default: true

      timestamps()
    end

    create unique_index(:qr_codes, [:type, :type_id, :enabled])
  end
end
