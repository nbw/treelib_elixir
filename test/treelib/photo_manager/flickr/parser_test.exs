defmodule Flickr.ParserTest do
  use ExUnit.Case, async: true

  test "decodes json object into map" do
    assert Flickr.Parser.decode(~s({"app": "TreeLib"})) == {:ok, %{ "app" => "TreeLib" }}
  end

  test "decodes! json object into map" do
    assert Flickr.Parser.decode!(~s({"app": "TreeLib"})) == %{ "app" => "TreeLib" }
  end
end
