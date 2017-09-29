defmodule Treelib.Repo.Migrations.AddTimestampsToPhotos do
  use Ecto.Migration

  def change do
    alter table(:photos) do
      timestamps()
    end
  end
end
