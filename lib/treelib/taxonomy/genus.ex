defmodule Treelib.Taxonomy.Genus do
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query, warn: false

  alias Treelib.Taxonomy.Family
  alias Treelib.Taxonomy.Genus
  alias Treelib.Taxonomy.Species

  @derive {Poison.Encoder, only: [:id, :name, :common_name, :description, :species, :fam_id]}

  schema "genera" do
    field :name, :string
    field :common_name, :string
    field :description, :string
    field :enabled, :boolean

    belongs_to :family, Family, foreign_key: :fam_id
    has_many :species, Species

    timestamps()
  end

  @doc false
  def changeset(%Genus{} = genus, attrs) do
    genus
    |> cast(attrs, [:name, :common_name, :description, :fam_id])
    |> validate_required([:name, :common_name, :description, :fam_id])
    |> foreign_key_constraint(:fam_id)
  end

  @doc false
  def disable_changeset(%Genus{} = genus, attrs) do
    genus
    |> cast(attrs, [:id, :enabled])
    |> validate_required([:id, :enabled])
  end

  @doc false
  def all(_query \\ __MODULE__) do
    Genus.active
    |> preload(species: ^Species.active) 
    |> order_by(asc: :name)
  end

  @doc false
  def active(query \\ __MODULE__) do
    from f in query,
      where: [enabled: true]
  end
end

