defmodule TreelibWeb.SitemapController do
  use TreelibWeb, :controller

  def sitemap(conn, _params) do
    read_and_send(conn, "sitemap")
  end

  def sitemap1(conn, _params) do
    read_and_send(conn, "sitemap1")
  end

  def read_and_send(conn, sitemap) do
    {:ok, xml} = File.read("priv/static/sitemaps/#{sitemap}.xml")

    conn
    |> put_resp_header("content-type", "application/xml")
    |> send_resp(200, xml)
  end
end
