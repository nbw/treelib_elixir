defmodule Treelib.Repo.Migrations.AddCountToQrCodes do
  use Ecto.Migration

  def change do
    alter table(:qr_codes) do
      add :count, :integer, default: 0
    end
  end
end
