defmodule TreelibWeb.QrView do
  use TreelibWeb, :view

  def render("create.json", %{code: code}) do
    code
  end
end
