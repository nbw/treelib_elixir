defmodule TreelibWeb.JSON do
  @moduledoc """
  Responsible for encoding and decoding JSON; a Phoenix wrapper around JSON.
  """

  defdelegate json_encode(data), to: Poison, as: :encode

  defdelegate json_encode!(data), to: Poison, as: :encode!

  defdelegate json_decode(data), to: Poison, as: :decode

  defdelegate json_decode!(data), to: Poison, as: :decode!

end
