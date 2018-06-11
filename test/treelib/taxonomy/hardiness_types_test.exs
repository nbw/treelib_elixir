defmodule Treelib.HardinessTypesTest do
  use Treelib.DataCase

  alias Treelib.Taxonomy.Species.HardinessTypes

  test "returns all accepted types" do
    assert HardinessTypes.all == ["a","b"]
  end

  test "returns true for a valid type" do
    assert HardinessTypes.valid_type?("a") == true
  end

  test "returns false for a valid type" do
    assert HardinessTypes.valid_type?("z") == false
  end
end
