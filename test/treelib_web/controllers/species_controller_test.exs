defmodule TreelibWeb.SpeciesControllerTest do
  use TreelibWeb.ConnCase

  alias Treelib.UserManager
  alias Treelib.Taxonomy.FamilyManager
  alias Treelib.Taxonomy.GenusManager
  alias Treelib.Taxonomy.SpeciesManager
  alias Treelib.PhotoManager

  @email "contact@website.com"
  @password "123456789"
  @valid_user_params %{
    name: "Nathan",
    email: @email,
    password: @password,
    password_confirmation: @password
  }

  @family_params %{
    name: "Araliaceae",
    common_name: "ivy",
    description: "",
    enabled: true
  }

  @genus_params %{
    name: "Aralia",
    common_name: "Angelica-Tree",
    description: "",
    enabled: true
  }

  @species_params %{
    name: "balsamea",
    common_name: "Balsam fir",
    description: "",
    enabled: true,
    album_id: 2,
    hardiness_min: 0,
    hardiness_max: 9,
    hardiness_min_type: "a",
    hardiness_max_type: "b"
  }

  @album_params %{
    photoset_id: 1,
    name: "Album name",
    last_updated: NaiveDateTime.utc_now
  }

  def family_fixture do
    FamilyManager.create_family(@family_params)
  end

  def genus_fixture({:ok, family}) do
    @genus_params
    |> Map.merge(%{fam_id: family.id})
    |> GenusManager.create_genus()
  end

  def species_fixture({:ok, genus}) do
    {:ok, album} = PhotoManager.create_album(@album_params)

    {:ok, species} = @species_params
    |> Map.merge(%{genus_id: genus.id})
    |> Map.merge(%{album_id: album.id})
    |> SpeciesManager.create_species()

    species = species |> Treelib.Repo.preload(:contributors)

    {:ok, species}
  end

  # GET /species.json
  describe "species.json/2" do
    test "Redirects to /search if non-admin (not logged in)", %{conn: conn} do
      response =
        conn
        |> get(species_path(conn, :index_json))

      assert redirected_to(response) =~ search_path(conn, :index)
    end

    test "Returns json of all species if admin", %{conn: conn} do
      # Create an admin user
      {:ok, user} = UserManager.register_admin_user(@valid_user_params)

      # Create species
      {:ok, species} = family_fixture()
      |> genus_fixture()
      |> species_fixture()

      # Login
      session_params = %{ session: %{email: @email, password: @password}}
      response =
        conn
        |> post(session_path(conn, :create, session_params))
        |> get(species_path(conn, :index_json))
        |> json_response(200)

      assert response == [
        %{
          "album_id" => species.album_id,
          "common_name" => species.common_name,
          "description" => "",
          "genus_id" => species.genus_id,
          "hardiness_max" => 9,
          "hardiness_max_type" => "b",
          "hardiness_min" => 0,
          "hardiness_min_type" => "a",
          "id" => species.id,
          "name" => species.name,
          "contributors" => []
        }
      ]
    end
  end

end
