defmodule Treelib.Taxonomy.Family do
  use Ecto.Schema
  import Ecto.Query, warn: false
  import Ecto.Changeset

  alias Treelib.Taxonomy.Family
  alias Treelib.Taxonomy.Genus

  @derive {Poison.Encoder, only: [:id, :name, :common_name, :description, :genera]}

  schema "families" do
    field :name, :string
    field :common_name, :string
    field :description, :string
    field :enabled, :boolean

    has_many :genera, Genus, foreign_key: :fam_id

    timestamps()
  end

  @doc false
  def changeset(%Family{} = family, attrs) do
    family
    |> cast(attrs, [:description])
    |> validate_required([:description])
  end

  @doc false
  def all(query \\ __MODULE__) do
    from f in query,
      where: [enabled: true]
  end
end
