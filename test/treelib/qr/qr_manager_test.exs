defmodule Treelib.Qr.QrManagerTest do
  use Treelib.DataCase

  import Treelib.Factory

  alias Treelib.QR.QrManager

  describe "species_with_code/0" do
    test "returns QR codes sorted by Genus name" do
      f = insert(:family, %{})

      genus_1 = insert(:genus, %{name: "Z", family: f})
      species_1 = insert(:species, %{name: "species name", genus: genus_1})
      assert {:ok, c1} = QrManager.create_code(species_1)

      genus_2 = insert(:genus, %{name: "A", family: f})
      species_2 = insert(:species, %{name: "species name", genus: genus_2})
      assert {:ok, c2} = QrManager.create_code(species_2)

      genus_3 = insert(:genus, %{name: "P", family: f})
      species_3 = insert(:species, %{name: "species name", genus: genus_3})
      assert {:ok, c3} = QrManager.create_code(species_3)

      species = QrManager.species_with_code()

      names = Enum.map(species, fn s -> "#{s.genus.name} #{s.name}" end)
      code_ids = Enum.map(species, fn s -> s.code.id end)

      assert names == ["A species name", "P species name", "Z species name"]
      assert code_ids == [c2.id, c3.id, c1.id]
    end
  end
end
