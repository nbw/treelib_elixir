# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Treelib.Repo.insert!(%Treelib.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.


alias Treelib.Repo
alias Treelib.UserManager.User
alias Treelib.Taxonomy.{
  Family,
  Genus,
  Species
}
alias Treelib.PhotoManager.{
  PhotoAlbum,
  Photo
}

defmodule Treelib.DbSeeder do

  @doc """
  Inserts a family.
  Inserts genera into that family.
  Inserts species in to those genera,
    with a photo album that has photos.
  """
  def insert_tree(
    num_families \\ 1,
    num_genera \\ 1,
    num_species \\ 1
  ) do

      # Photo Album and Photos for species
      photo_album = insert_album();
      (1..25)
      |> Enum.each(fn _ ->
        insert_photo()
      end)

      (1..num_families)
      |> Enum.each(fn i ->
        family = insert_family(i)

        (1..num_genera)
        |> Enum.each(fn j ->
          genus = insert_genus(j, family.id)

          (1..num_species)
          |> Enum.each(fn h ->
            insert_species(h, genus.id, photo_album.id)
          end)
        end)
      end)
    end

    def insert_family(increment) do
      %Family{}
      |> Family.changeset(%{
        name: "#{lorem_name()} #{increment} ",
        common_name: "#{lorem_name()} ",
        description: "#{lorem_description()}"
      })
      |> Repo.insert!()
    end

    def insert_genus(increment, family_id) do
      %Genus{}
      |> Genus.changeset(%{
        name: "#{lorem_name()} #{increment} ",
        common_name: lorem_name(),
        description: lorem_description(),
        fam_id: family_id
      })
      |> Repo.insert!()
    end

    def insert_species(increment, genus_id, photo_album_id) do
      %Species{}
      |> Species.changeset(%{
        name: "#{lorem_name()} #{increment} ",
        common_name: lorem_name(),
        description: lorem_description(),
        genus_id: genus_id,
        album_id: photo_album_id
      })
      |> Repo.insert!()
    end

    def insert_album(
      photoset_id \\ 72157703072517021
    ) do
      %PhotoAlbum{}
      |> PhotoAlbum.changeset(%{
        name: lorem_name(),
        photoset_id: photoset_id,
        last_updated: ~N[2018-06-11 23:00:07.000000Z]
      })
      |> Repo.insert!()
    end

    def insert_photo(
      photoset_id \\ 72157703072517021,
      flickr_id \\ 32407648188,
      farm \\ 5,
      secret \\ "cb70cf3fbc",
      server \\ 4810
    ) do
      %Photo{}
      |> Photo.changeset(%{
        flickr_id: flickr_id,
        farm: farm,
        secret: secret,
        server: server,
        name: lorem_name(),
        description: lorem_description(),
        photoset_id: photoset_id
      })
      |> Repo.insert!()
    end

    defp lorem_name(range \\ 1..2) do
      Faker.Lorem.words(range)
      |> Enum.join(" ")
      |> String.capitalize()
    end

    defp lorem_description(range \\ 1..3) do
      Faker.Lorem.sentences(range)
      |> Enum.join(" ")
    end
end

# Create an admin user with password 123456789
%User{admin_level: true}
|> User.admin_registration_changeset(%{
  email: "admin@treelib.ca",
  name: "Admin",
  password: "123456789",
  password_confirmation: "123456789",
  admin_level: true,
  enabled: true
})
|> Repo.insert!()

# Insert family/genus/species/photos
Treelib.DbSeeder.insert_tree(25, 3, 5)
