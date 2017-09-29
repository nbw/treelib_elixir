defmodule Treelib.PhotoManager.PhotoAlbum do
  use Ecto.Schema
  import Ecto.Changeset
  alias Treelib.PhotoManager.Photo
  alias Treelib.PhotoManager.PhotoAlbum
  alias Treelib.Taxonomy.Species


  schema "photo_albums" do
    field :photoset_id, :integer
    field :name, :string
    field :last_updated, :utc_datetime

    has_many :photos, Photo, references: :photoset_id, foreign_key: :photoset_id
    has_many :species, Species, foreign_key: :album_id

    timestamps()
  end

  @doc false
  def changeset(%PhotoAlbum{} = album, attrs) do
    album
    |> cast(attrs, [])
    |> validate_required([])
  end
end
