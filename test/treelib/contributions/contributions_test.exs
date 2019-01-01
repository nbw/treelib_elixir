require IEx
defmodule Treelib.ContributionsTest do
  use Treelib.DataCase

  alias Treelib.Contributions

  import Treelib.Factory

  describe "contributors" do
    alias Treelib.Contributions.Contributor

    @valid_attrs %{
      description: "some description",
      first_name: "some first_name",
      last_name: "some last_name",
      enabled: true
    }
    @update_attrs %{description: "some updated description", first_name: "some updated first_name", last_name: "some updated last_name"}
    @invalid_attrs %{description: nil, first_name: nil, last_name: nil}

    def contributor_fixture(attrs \\ %{}) do
      {:ok, contributor} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Contributions.create_contributor()

      contributor
    end

    def species_fixture do
      f = insert(:family, %{})
      g = insert(:genus,  %{family: f})
      a = insert(:photo_album, %{})

      insert(:species, %{genus: g, album: a})
    end

    test "list_contributors/0 returns all active contributors" do
      contributor = contributor_fixture()

      # disabled contributor
      contributor_fixture(%{enabled: false})

      assert Contributions.list_contributors() == [contributor]
    end

    test "get_contributor!/1 returns the contributor with given id" do
      contributor = contributor_fixture()
      assert Contributions.get_contributor!(contributor.id) == contributor
    end

    test "create_contributor/1 with valid data creates a contributor" do
      assert {:ok, %Contributor{} = contributor} = Contributions.create_contributor(@valid_attrs)
      assert contributor.description == "some description"
      assert contributor.first_name == "some first_name"
      assert contributor.last_name == "some last_name"
    end

    test "create_contributor/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Contributions.create_contributor(@invalid_attrs)
    end

    test "create_contributor/1 with a species returns a contributor and join table record" do
      species = species_fixture()

      contributor_attrs =
        %{species: [species]}
        |> Enum.into(@valid_attrs)

      assert {:ok, %Contributor{} = contributor} = Contributions.create_contributor(contributor_attrs)
      assert contributor.species == [species]

    end

    test "update_contributor/2 with valid data updates the contributor" do
      contributor = contributor_fixture()
      assert {:ok, %Contributor{} = contributor} = Contributions.update_contributor(contributor, @update_attrs)
      assert contributor.description == "some updated description"
      assert contributor.first_name == "some updated first_name"
      assert contributor.last_name == "some updated last_name"
    end

    test "update_contributor/2 with a species returns a contributor and join table record" do
      species = species_fixture()

      contributor_attrs =
        %{species: [species]}
        |> Enum.into(@update_attrs)

      contributor = contributor_fixture()

      assert {:ok, %Contributor{} = contributor} = Contributions.update_contributor(contributor, contributor_attrs)
      assert contributor.species == [species]
    end

    test "update_contributor/2 with invalid data returns error changeset" do
      contributor = contributor_fixture()
      assert {:error, %Ecto.Changeset{}} = Contributions.update_contributor(contributor, @invalid_attrs)
      assert contributor == Contributions.get_contributor!(contributor.id)
    end

    test "delete_contributor/1 deletes the contributor" do
      contributor = contributor_fixture()
      assert {:ok, %Contributor{}} = Contributions.delete_contributor(contributor)
      assert_raise Ecto.NoResultsError, fn -> Contributions.get_contributor!(contributor.id) end
    end

    test "change_contributor/1 returns a contributor changeset" do
      contributor = contributor_fixture()
      assert %Ecto.Changeset{} = Contributions.change_contributor(contributor)
    end
  end
end
