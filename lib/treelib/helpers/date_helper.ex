defmodule Helpers.DateHelper do
  @moduledoc """
  Date/Time related helper methods.

  Usage:
  import Helpers.DateHelper

  """

  @doc """
  Returns the current time as a NaiveDateTime type.

  Truncates to seconds (a requirement for inserted_at/updated_at columns)
  """
  def naive_now do
    Timex.now
    |> Timex.to_naive_datetime
    |> NaiveDateTime.truncate(:second)
  end
end
