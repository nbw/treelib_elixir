defmodule Treelib.Repo.Migrations.RemoveCreateDateFromUsers do
  use Ecto.Migration

  def change do
    alter table("users") do
      remove :create_date
    end
  end
end
