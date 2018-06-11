defmodule Treelib.Taxonomy.Species.HardinessTypes do
  @moduledoc """
  Defines accepted Hardiness Types
  """

  @types ["a","b"]

  def all, do: @types

  def valid_type?(type), do: Enum.member?(@types, type)
end
