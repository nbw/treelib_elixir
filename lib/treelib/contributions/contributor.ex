defmodule Treelib.Contributions.Contributor do
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query, warn: false

  alias Treelib.Repo
  alias Treelib.Taxonomy.Species

  @derive {Poison.Encoder, only: [:id, :first_name, :last_name, :description]}

  schema "contributors" do
    field :description, :string
    field :first_name, :string
    field :last_name, :string
    field :enabled, :boolean, default: true

    field :species_ids, {:array, :integer}, virtual: true

    many_to_many :species, Species, join_through: "contributors_species", on_replace: :delete

    timestamps()
  end

  @doc false
  def changeset(contributor, attrs) do
    contributor
    |> cast(attrs, [:first_name, :last_name, :description, :enabled, :species_ids])
    |> validate_required([:first_name, :last_name, :description])
    |> maybe_load_species()
    |> maybe_assoc_species(attrs)
  end

  defp maybe_assoc_species(changeset, %{species: species}) do
    changeset
    |> Ecto.Changeset.put_assoc(:species, species)
  end

  defp maybe_assoc_species(changeset, _attrs), do: changeset

  defp maybe_load_species(%{valid?: true, changes: %{species_ids: ids}} = changeset) do
    species = Repo.all(from s in Species, where: s.id in ^ids)

    put_change(changeset, :species, species)
  end

  defp maybe_load_species(changeset),
  do: changeset

  @doc false
  def active(query \\ __MODULE__) do
    from c in query,
      where: [enabled: true],
      order_by: c.last_name
  end
end
