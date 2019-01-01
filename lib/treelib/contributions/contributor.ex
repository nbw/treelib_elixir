defmodule Treelib.Contributions.Contributor do
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query, warn: false


  schema "contributors" do
    field :description, :string
    field :first_name, :string
    field :last_name, :string
    field :enabled, :boolean, default: true

    many_to_many :species, Treelib.Taxonomy.Species, join_through: "contributors_species"

    timestamps()
  end

  @doc false
  def changeset(contributor, attrs) do
    contributor
    |> cast(attrs, [:first_name, :last_name, :description, :enabled])
    |> validate_required([:first_name, :last_name, :description])
    |> maybe_assoc_species(attrs)
  end

  def maybe_assoc_species(changeset, %{species: species}) do
    changeset
    |> Ecto.Changeset.put_assoc(:species, species)
  end

  def maybe_assoc_species(changeset, _attrs), do: changeset

  @doc false
  def active(query \\ __MODULE__) do
    from c in query,
      where: [enabled: true]
  end
end
