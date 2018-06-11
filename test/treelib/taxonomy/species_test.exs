require IEx
defmodule Treelib.SpeciesTest do
  use Treelib.DataCase

  alias Treelib.Taxonomy.Species

  @valid_attrs %{
    name: "balsamea",
    common_name: "Balsam fir",
    description: "text",
    enabled: true,
    genus_id: 1,
    album_id: 2,
    hardiness_min: 0,
    hardiness_max: 9,
    hardiness_min_type: "a",
    hardiness_max_type: "b"
  }

  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Species.changeset(%Species{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Species.changeset(%Species{}, @invalid_attrs)
    refute changeset.valid?
  end

  test "changeset with hardiness max and min both nil is still valid" do
    attrs = @valid_attrs
    |> Map.replace!(:hardiness_min, nil)
    |> Map.replace!(:hardiness_max, nil)

    changeset = Species.changeset(%Species{hardiness_min: 0}, attrs)
    assert changeset.valid?
  end

  test "changeset with just hardiness_min = nil is invalid" do
    attrs = @valid_attrs
    |> Map.replace!(:hardiness_min, nil)

    changeset = Species.changeset(%Species{hardiness_min: 0}, attrs)
    refute changeset.valid?
  end

  test "changeset with just hardiness_max = nil is invalid" do
    attrs = @valid_attrs
    |> Map.replace!(:hardiness_max, nil)

    changeset = Species.changeset(%Species{hardiness_max: 9}, attrs)

    refute changeset.valid?
  end

  test "hardiness_min must be between 0 to 9" do

    # below 0
    attrs = @valid_attrs |> Map.replace!(:hardiness_min, -1)
    changeset = Species.changeset(%Species{}, attrs)
    refute changeset.valid?

    # above 9
    attrs = @valid_attrs |> Map.replace!(:hardiness_min, 10)
    changeset = Species.changeset(%Species{}, attrs)
    refute changeset.valid?

    # 0
    attrs = @valid_attrs |> Map.replace!(:hardiness_min, 0)
    changeset = Species.changeset(%Species{}, attrs)
    assert changeset.valid?

    # 9
    attrs = @valid_attrs |> Map.replace!(:hardiness_min, 9)
    changeset = Species.changeset(%Species{}, attrs)
    assert changeset.valid?
  end

  test "hardiness_max must be between 0 to 9" do
    # below 0
    attrs = @valid_attrs |> Map.replace!(:hardiness_max, -1)
    changeset = Species.changeset(%Species{}, attrs)
    refute changeset.valid?

    # above 9
    attrs = @valid_attrs |> Map.replace!(:hardiness_max, 11)
    changeset = Species.changeset(%Species{}, attrs)
    refute changeset.valid?

    # 0
    attrs = @valid_attrs |> Map.replace!(:hardiness_max, 0)
    changeset = Species.changeset(%Species{}, attrs)
    assert changeset.valid?

    # 9
    attrs = @valid_attrs |> Map.replace!(:hardiness_max, 9)
    changeset = Species.changeset(%Species{}, attrs)
    assert changeset.valid?
  end

  test "hardiness_max must be greater than hardiness_min" do
    attrs = @valid_attrs |> Map.replace!(:hardiness_max, 1) |> Map.replace!(:hardiness_min, 5)
    changeset = Species.changeset(%Species{}, attrs)
    refute changeset.valid?

    attrs = @valid_attrs |> Map.replace!(:hardiness_max, 5) |> Map.replace!(:hardiness_min, 4)
    changeset = Species.changeset(%Species{}, attrs)
    assert changeset.valid?
  end

  test "hardiness values must both be defined or not at all" do
    attrs = @valid_attrs |> Map.replace!(:hardiness_max, 1) |> Map.replace!(:hardiness_min, nil)
    changeset = Species.changeset(%Species{hardiness_min: 0}, attrs)
    refute changeset.valid?

    attrs = @valid_attrs |> Map.replace!(:hardiness_max, nil) |> Map.replace!(:hardiness_min, 0)
    changeset = Species.changeset(%Species{hardiness_max: 0}, attrs)
    refute changeset.valid?
  end

  test "hardiness types are validated" do
    attrs = @valid_attrs |> Map.replace!(:hardiness_max_type, "a")
    changeset = Species.changeset(%Species{hardiness_max_type: nil}, attrs)
    assert changeset.valid?

    attrs = @valid_attrs |> Map.replace!(:hardiness_min_type, "z")
    changeset = Species.changeset(%Species{hardiness_min_type: nil}, attrs)
    refute changeset.valid?
  end

  test "hardiness types can be nil" do
    attrs = @valid_attrs |> Map.replace!(:hardiness_max_type, nil)
    changeset = Species.changeset(%Species{hardiness_max_type: "a"}, attrs)
    assert changeset.valid?

    attrs = @valid_attrs |> Map.replace!(:hardiness_min_type, nil)
    changeset = Species.changeset(%Species{hardiness_min_type: "b"}, attrs)
    assert changeset.valid?
  end
end
