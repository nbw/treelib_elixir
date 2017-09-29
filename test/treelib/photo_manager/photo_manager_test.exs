defmodule Treelib.PhotoManagerTest do
  use Treelib.DataCase

  alias Treelib.PhotoManager

  describe "albums" do
    alias Treelib.PhotoManager.Album

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def album_fixture(attrs \\ %{}) do
      {:ok, album} =
        attrs
        |> Enum.into(@valid_attrs)
        |> PhotoManager.create_album()

      album
    end

    test "list_albums/0 returns all albums" do
      album = album_fixture()
      assert PhotoManager.list_albums() == [album]
    end

    test "get_album!/1 returns the album with given id" do
      album = album_fixture()
      assert PhotoManager.get_album!(album.id) == album
    end

    test "create_album/1 with valid data creates a album" do
      assert {:ok, %Album{} = album} = PhotoManager.create_album(@valid_attrs)
    end

    test "create_album/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = PhotoManager.create_album(@invalid_attrs)
    end

    test "update_album/2 with valid data updates the album" do
      album = album_fixture()
      assert {:ok, album} = PhotoManager.update_album(album, @update_attrs)
      assert %Album{} = album
    end

    test "update_album/2 with invalid data returns error changeset" do
      album = album_fixture()
      assert {:error, %Ecto.Changeset{}} = PhotoManager.update_album(album, @invalid_attrs)
      assert album == PhotoManager.get_album!(album.id)
    end

    test "delete_album/1 deletes the album" do
      album = album_fixture()
      assert {:ok, %Album{}} = PhotoManager.delete_album(album)
      assert_raise Ecto.NoResultsError, fn -> PhotoManager.get_album!(album.id) end
    end

    test "change_album/1 returns a album changeset" do
      album = album_fixture()
      assert %Ecto.Changeset{} = PhotoManager.change_album(album)
    end
  end

  describe "photos" do
    alias Treelib.PhotoManager.Photo

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def photo_fixture(attrs \\ %{}) do
      {:ok, photo} =
        attrs
        |> Enum.into(@valid_attrs)
        |> PhotoManager.create_photo()

      photo
    end

    test "list_photos/0 returns all photos" do
      photo = photo_fixture()
      assert PhotoManager.list_photos() == [photo]
    end

    test "get_photo!/1 returns the photo with given id" do
      photo = photo_fixture()
      assert PhotoManager.get_photo!(photo.id) == photo
    end

    test "create_photo/1 with valid data creates a photo" do
      assert {:ok, %Photo{} = photo} = PhotoManager.create_photo(@valid_attrs)
    end

    test "create_photo/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = PhotoManager.create_photo(@invalid_attrs)
    end

    test "update_photo/2 with valid data updates the photo" do
      photo = photo_fixture()
      assert {:ok, photo} = PhotoManager.update_photo(photo, @update_attrs)
      assert %Photo{} = photo
    end

    test "update_photo/2 with invalid data returns error changeset" do
      photo = photo_fixture()
      assert {:error, %Ecto.Changeset{}} = PhotoManager.update_photo(photo, @invalid_attrs)
      assert photo == PhotoManager.get_photo!(photo.id)
    end

    test "delete_photo/1 deletes the photo" do
      photo = photo_fixture()
      assert {:ok, %Photo{}} = PhotoManager.delete_photo(photo)
      assert_raise Ecto.NoResultsError, fn -> PhotoManager.get_photo!(photo.id) end
    end

    test "change_photo/1 returns a photo changeset" do
      photo = photo_fixture()
      assert %Ecto.Changeset{} = PhotoManager.change_photo(photo)
    end
  end
end
