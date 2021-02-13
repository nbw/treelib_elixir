defmodule Treelib.QR.Code do
  alias __MODULE__
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query, warn: false

  @types ~w[species genus family]

  schema "qr_codes" do
    field :type, :string
    field :type_id, :integer
    field :count, :integer
    field :enabled, :boolean

    timestamps()
  end

  @doc false
  def changeset(%Code{} = code, attrs) do
    code
    |> cast(attrs, [:type, :type_id, :count])
    |> validate_required([:type, :type_id])
    |> validate_inclusion(:type, @types)
  end

  @doc false
  def active(query \\ __MODULE__) do
    from c in query,
      where: [enabled: true],
      order_by: c.id
  end
end
