defmodule TreelibWeb.AdminQrView do
  use TreelibWeb, :view

  alias Treelib.QR.QrManager

  def qr_code(code) do
    QrManager.qr_code_url(code)
  end

  def format_date(naive_date) do
    {:ok, date} = DateTime.from_naive(naive_date, "Etc/UTC")

    date
    |> DateTime.to_string()
  end
end
