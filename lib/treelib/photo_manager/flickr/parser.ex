defmodule Flickr.Parser do
  @moduledoc """
  Handles JSON decoding for the Flickr API
  """

  defdelegate decode(data), to: Poison, as: :decode

  defdelegate decode!(data), to: Poison, as: :decode!
end
