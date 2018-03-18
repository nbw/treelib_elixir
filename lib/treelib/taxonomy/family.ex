defmodule Treelib.Taxonomy.Family do
  use Ecto.Schema
  import Ecto.Query, warn: false
  import Ecto.Changeset

  alias Treelib.Taxonomy.Family
  alias Treelib.Taxonomy.Genus
  alias Treelib.Taxonomy.Species

  @derive {Poison.Encoder, only: [:id, :name, :common_name, :description, :genera]}

  schema "families" do
    field :name, :string
    field :common_name, :string
    field :description, :string, default: ""
    field :enabled, :boolean

    has_many :genera, Genus, foreign_key: :fam_id

    timestamps()
  end

  @doc false
  def changeset(%Family{} = family, attrs) do
    family
    |> cast(attrs, [:name, :common_name, :description])
    |> validate_required([:name, :common_name])
  end

  @doc false
  def disable_changeset(%Family{} = family, attrs) do
    family
    |> cast(attrs, [:id, :enabled])
    |> validate_required([:id, :enabled])
  end

  def all(_query \\ __MODULE__) do
    Family.active
    |> preload([genera: ^Genus.active]) 
    |> preload(genera: [species: ^Species.active]) 
    |> order_by(asc: :name)
  end

  @doc false
  def active(query \\ __MODULE__) do
    from f in query,
      where: [enabled: true]
  end
end
