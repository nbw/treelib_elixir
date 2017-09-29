defmodule Treelib.Repo.Migrations.AddTimestampsToPhotoAlbums do
  use Ecto.Migration

  def change do
    alter table(:photo_albums) do
      timestamps()
    end
  end
end
