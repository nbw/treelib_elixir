defmodule Treelib.PhotoManager.PhotoBuilderTest do
  use ExUnit.Case, async: true
  alias Treelib.PhotoManager.PhotoBuilder
  alias Treelib.PhotoManager.PhotoBuilder.SizeError
  doctest PhotoBuilder

  describe "photo_url/2" do
    test "raises exception when not a valid Flickr size" do
      photo = %Treelib.PhotoManager.Photo{
        farm: 1, flickr_id: 32041946126, id: 853847,
        photoset_id: 72157678592591876, secret: "5357003775", server: 420
      }

      assert_raise SizeError, fn ->
        PhotoBuilder.photo_url(photo,"y")
      end
    end
  end
end
