defmodule Treelib.Taxonomy.Species do
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query, warn: false

  alias Treelib.Taxonomy.Genus
  alias Treelib.Taxonomy.Species
  alias Treelib.PhotoManager.PhotoAlbum

  @derive {Poison.Encoder, only: [:id, :name, :common_name, :description, :genus_id, :album_id]}

  schema "species" do
    field :name, :string
    field :common_name, :string
    field :description, :string
    field :enabled, :boolean

    belongs_to :genus, Genus
    belongs_to :album, Album

    timestamps()
  end

  @doc false
  def changeset(%Species{} = species, attrs) do
    species
    |> cast(attrs, [:name, :common_name, :description, :genus_id, :album_id])
    |> validate_required([:name, :common_name, :description, :genus_id, :album_id])
    |> foreign_key_constraint(:genus_id)
  end

  @doc false
  def disable_changeset(%Species{} = species, attrs) do
    species
    |> cast(attrs, [:id, :enabled])
    |> validate_required([:id, :enabled])
  end

  @doc false
  def active(query \\ __MODULE__) do
    from f in query,
      where: [enabled: true]
  end
end

