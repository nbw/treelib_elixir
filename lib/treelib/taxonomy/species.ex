defmodule Treelib.Taxonomy.Species do
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query, warn: false

  import Treelib.Taxonomy.Species.HardinessValidator

  alias Treelib.Taxonomy.Genus
  alias Treelib.Taxonomy.Species
  alias Treelib.PhotoManager.PhotoAlbum

  @derive {Poison.Encoder, only: [:id, :name, :common_name, :description, :genus_id, :album_id, :hardiness_min, :hardiness_min_type, :hardiness_max, :hardiness_max_type, :contributors]}

  schema "species" do
    field :name, :string
    field :common_name, :string
    field :description, :string, default: ""
    field :enabled, :boolean
    field :hardiness_min, :integer
    field :hardiness_max, :integer
    field :hardiness_min_type, :string
    field :hardiness_max_type, :string

    belongs_to :genus, Genus
    belongs_to :album, PhotoAlbum

    many_to_many :contributors, Treelib.Contributions.Contributor, join_through: "contributors_species"

    timestamps()
  end

  @doc false
  def changeset(%Species{} = species, attrs) do
    species
    |> cast(attrs, [:name, :common_name, :description, :genus_id, :album_id, :hardiness_min, :hardiness_max, :hardiness_min_type, :hardiness_max_type])
    |> validate_required([:name, :common_name, :genus_id, :album_id])
    |> validate_hardiness
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
    from s in query,
      where: [enabled: true],
      order_by: s.name
  end
end
