defmodule Treelib.TaxonomyTest do
  use Treelib.DataCase

  alias Treelib.Taxonomy

  describe "name" do
    alias Treelib.Taxonomy.Family

    @valid_attrs %{description: "some description"}
    @update_attrs %{description: "some updated description"}
    @invalid_attrs %{description: nil}

    def family_fixture(attrs \\ %{}) do
      {:ok, family} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Taxonomy.create_family()

      family
    end

    test "list_name/0 returns all name" do
      family = family_fixture()
      assert Taxonomy.list_name() == [family]
    end

    test "get_family!/1 returns the family with given id" do
      family = family_fixture()
      assert Taxonomy.get_family!(family.id) == family
    end

    test "create_family/1 with valid data creates a family" do
      assert {:ok, %Family{} = family} = Taxonomy.create_family(@valid_attrs)
      assert family.description == "some description"
    end

    test "create_family/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Taxonomy.create_family(@invalid_attrs)
    end

    test "update_family/2 with valid data updates the family" do
      family = family_fixture()
      assert {:ok, family} = Taxonomy.update_family(family, @update_attrs)
      assert %Family{} = family
      assert family.description == "some updated description"
    end

    test "update_family/2 with invalid data returns error changeset" do
      family = family_fixture()
      assert {:error, %Ecto.Changeset{}} = Taxonomy.update_family(family, @invalid_attrs)
      assert family == Taxonomy.get_family!(family.id)
    end

    test "delete_family/1 deletes the family" do
      family = family_fixture()
      assert {:ok, %Family{}} = Taxonomy.delete_family(family)
      assert_raise Ecto.NoResultsError, fn -> Taxonomy.get_family!(family.id) end
    end

    test "change_family/1 returns a family changeset" do
      family = family_fixture()
      assert %Ecto.Changeset{} = Taxonomy.change_family(family)
    end
  end
end
