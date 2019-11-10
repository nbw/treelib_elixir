defmodule TreelibWeb.Sitemap.Worker do
  use GenServer
  import Logger

  def start_link(_) do
    GenServer.start_link(__MODULE__, :ok, name: __MODULE__)
  end

  def init(:ok) do
    Process.send_after(self(), :work, 10_000)
    {:ok, %{last_run_at: nil}}
  end

  def handle_info(:work, _state) do
    Logger.info("[Sitemap Worker]: Generating sitemap files..")
    :ok = TreelibWeb.Sitemap.generate
    {:noreply, %{}}
  end
end
