defmodule Treelib.QR.QrManager do
  @moduledoc """
    Handles QR Code creation, updates, deletion, and get.
  """

  import Ecto.Query, warn: false
  alias Treelib.Repo

  alias Treelib.QR.Code

  alias Treelib.Taxonomy.{
    Species,
    Genus,
    Family
  }

  @doc false
  def species_with_code do
    Species.active()
    |> join(:inner, [species], code in assoc(species, :code))
    |> preload([:genus, :code])
    |> Repo.all()
  end

  @doc false
  def get_code!(id) do
    Code.active()
    |> Repo.get!(id)
  end

  @doc false
  def get_code(id) do
    Code.active()
    |> Repo.get(id)
    |> case do
      %Code{} = code ->
        {:ok, code}

      nil ->
        {:error, :not_found}
    end
  end

  @doc false
  def get_by_type!(type, type_id) do
    Code.active()
    |> Repo.get_by!(type: type, type_id: type_id)
  end

  @doc false
  def get_by_type(type, type_id) do
    Code.active()
    |> Repo.get_by(type: type, type_id: type_id)
  end

  @doc false
  def create_code(attrs \\ %{})

  def create_code(%Species{id: id}) do
    create_code(%{type: "species", type_id: id})
  end

  def create_code(%Genus{id: id}) do
    create_code(%{type: "genus", type_id: id})
  end

  def create_code(%Family{id: id}) do
    create_code(%{type: "family", type_id: id})
  end

  def create_code(attrs) do
    %Code{}
    |> Code.changeset(attrs)
    |> Repo.insert()
  end

  @doc false
  def update_code(%Code{} = code, attrs) do
    code
    |> Code.changeset(attrs)
    |> Repo.update()
  end

  @doc false
  def delete_code(%Code{} = code) do
    Repo.delete(code)
  end

  def qr_code_url(nil), do: nil

  def qr_code_url(%Code{} = code) do
    TreelibWeb.Router.Helpers.qr_url(TreelibWeb.Endpoint, :show, code.id)
  end

  def increment_count(%Code{} = code) do
    code
    |> Code.changeset(%{count: code.count + 1})
    |> Repo.update()
  end
end
