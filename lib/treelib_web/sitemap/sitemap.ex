defmodule TreelibWeb.Sitemap do
  alias TreelibWeb.{Endpoint, Router.Helpers}

  @moduledoc """
  This module will need to be called manually to generate sitemap.xml and sitemap1.xml files
  """

  use Sitemap,
    host: "https://treelib.ca/",
    files_path: "priv/static/sitemaps/",
  public_path: "sitemaps/",
  compress: false

  def generate do
    create do
      add "/", priority: 0.5, changefreq: "hourly", expires: nil
      add "/about", priority: 0.5, changefreq: "hourly", expires: nil
      add "/search", priority: 0.5, changefreq: "hourly", expires: nil
      add "/contributors", priority: 0.5, changefreq: "hourly", expires: nil
    end
  end

  def generate_and_ping do
    generate()
    # notify search engines (currently Google and Bing) of the updated sitemap
    ping()
  end
end
