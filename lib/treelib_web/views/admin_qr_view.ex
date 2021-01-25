defmodule TreelibWeb.AdminQrView do
  use TreelibWeb, :view

  alias Treelib.QR.QrManager

  def qr_code(code) do
    QrManager.qr_code_url(code)
  end
end
