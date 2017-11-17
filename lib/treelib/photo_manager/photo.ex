defmodule Treelib.PhotoManager.Photo do
  use Ecto.Schema
  import Ecto.Changeset
  alias Treelib.PhotoManager.Photo
  alias Treelib.PhotoManager.PhotoAlbum


  schema "photos" do
    field :flickr_id, :integer
    field :farm, :integer
    field :secret, :string
    field :server, :integer

    field :name, :string
    field :description, :string
    field :credit, :string
    field :disable_date, :utc_datetime
    
    belongs_to :photo_album, PhotoAlbum, references: :photoset_id, foreign_key: :photoset_id

    timestamps()
  end

  @doc false
  def changeset(%Photo{} = photo, attrs) do
    photo
    |> cast(attrs, [])
    |> validate_required([])
  end
end
