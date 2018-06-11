defmodule Treelib.Repo.Migrations.MigrateSinatraAppToElixir do
  use Ecto.Migration

  def change do
  	# %%%%% USERS %%%%%%%
  	create table(:users) do
      add :name, :string
      add :email, :string
      add :pw_hash, :string
      add :create_date, :naive_datetime
      add :disable_date, :naive_datetime
      add :enabled, :boolean, default: true
      add :admin_level, :integer, default: 0
    end

    create unique_index(:users, [:email])

    # %%%%% PHOTO ALBUMS %%%%%%%
  	create table(:photo_albums) do
      add :photoset_id, :bigint
      add :name, :string
      add :last_updated, :naive_datetime
    end

    # %%%%% PHOTOS %%%%%%%
  	create table(:photos) do
      add :flickr_id, :bigint
      add :photoset_id, :bigint
      add :farm, :integer
      add :secret, :string
      add :server, :integer
      add :name, :string
      add :description, :string, size: 1024
      add :credit, :string
      add :disable_date, :naive_datetime
    end

    # %%%%% FAMILIES %%%%%%%
  	create table(:families) do
      add :name, :string
      add :common_name, :string, default: ""
      add :description, :string
      add :enabled, :boolean, default: true
    end

    # %%%%% GENERA %%%%%%%
  	create table(:genera) do
      add :name, :string
      add :common_name, :string, default: ""
      add :description, :string
      add :fam_id, references(:families)
      add :enabled, :boolean, default: true
    end

    # %%%%% SPECIES %%%%%%%
  	create table(:species) do
      add :name, :string
      add :common_name, :string, default: ""
      add :description, :string
      add :genus_id, references(:genera)
      add :album_id, references(:photo_albums)
      add :enabled, :boolean, default: true
    end

  	# %%%%% SPECIES LINKS %%%%%%%
		create table(:species_links) do
    	add :species_id, references(:species)
    	add :name, :string
    	add :url, :string

  		timestamps()
  	end

  end
end
