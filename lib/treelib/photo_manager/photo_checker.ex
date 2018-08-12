defmodule Treelib.PhotoManager.PhotoChecker   do
  @moduledoc """
  Reschedules syncs with flickr
  """
  use GenServer

  def start_link do
    GenServer.start_link(__MODULE__, %{}, name: :photo_checker)
  end

  def init(state) do
    schedule_check()
    {:ok, state}
  end

  def update do
    GenServer.call(:photo_checker, :update, timeout())
  end

  def handle_call(:update, _from, state) do
    IO.puts("Check Flickr..")
    process()
    {:noreply, state}
  end

  def handle_info(:update_and_schedule, state) do
    IO.puts("Check Flickr and reschedule..")
    process()
    schedule_check()
    {:noreply, state}
  end

  defp process do
    Treelib.PhotoManager.PhotoUpdater.process_all
  end

  # schedule a check every hour
  defp schedule_check() do
    Process.send_after(self(), :update_and_schedule,  30 * 60 * 1000)
  end

  # Pull the timout from the DATABASE_TIMEOUT envar
  # Else: use 145000
  defp timeout do
    case System.get_env("DATABASE_TIMEOUT") do
      nil ->
        145000
      db_t ->
        String.to_integer(db_t)
    end
  end
end
