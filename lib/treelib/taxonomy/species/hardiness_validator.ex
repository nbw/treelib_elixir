defmodule Treelib.Taxonomy.Species.HardinessValidator do
  import Ecto.Changeset

  alias Treelib.Taxonomy.Species.HardinessTypes

  def validate_hardiness(changeset) do
    changeset
    |> validate_hardiness_min
    |> validate_hardiness_max
    |> validate_hardiness_values
    |> validate_inclusion(:hardiness_min_type, [nil] ++ HardinessTypes.all)
    |> validate_inclusion(:hardiness_max_type, [nil] ++ HardinessTypes.all)
  end

  # If hardiness_min is nil, check that max is also nil
  defp validate_hardiness_min(%Ecto.Changeset{ changes: %{hardiness_min: nil} = changes, data: %{hardiness_max: data_hardiness_max }} = changeset) do
    hardiness_max = changes[:hardiness_max] || data_hardiness_max

    if is_number(hardiness_max) do
      add_error(changeset, :hardiness_min, "empty")
    else
      changeset
    end
  end

  # hardiness_min should be between 0..9
  defp validate_hardiness_min(%Ecto.Changeset{ changes: %{hardiness_min: _}} = changeset) do
    validate_inclusion(changeset, :hardiness_min, 0..9)
  end

  defp validate_hardiness_min(changeset) do changeset end


  # If hardiness_max is nil, check that min is also nil
  defp validate_hardiness_max(%Ecto.Changeset{ changes: %{hardiness_max: nil} = changes, data: %{hardiness_min: data_hardiness_min }} = changeset) do
    hardiness_min = changes[:hardiness_min] || data_hardiness_min

    if is_number(hardiness_min) do
      add_error(changeset, :hardiness_max, "empty")
    else
      changeset
    end
 end

  # hardiness_max should be between 0..9
  defp validate_hardiness_max(%Ecto.Changeset{ changes: %{hardiness_max: _hardiness_max}} = changeset) do
    changeset |> validate_inclusion(:hardiness_max, 0..9)
  end

  defp validate_hardiness_max(changeset) do changeset end

  # hardiness_max > hardiness_min
  defp validate_hardiness_values(%Ecto.Changeset{ changes: changes, data: %{hardiness_max: data_hardiness_max, hardiness_min: data_hardiness_min}} = changeset) do
    hardiness_max = changes[:hardiness_max] || data_hardiness_max
    hardiness_min = changes[:hardiness_min] || data_hardiness_min

    changeset
    |> validate_number(:hardiness_min, less_than_or_equal_to: hardiness_max)
  end
end
