defmodule TreelibWeb.AdminDebugLiveView do
  use Phoenix.LiveView

  def render(assigns) do
    Phoenix.View.render(TreelibWeb.AdminDebugView, "index.html", assigns)
  end

  def mount(_, _, socket) do
    {:ok, assign(socket, reset: false, relink: false, unlinked_species: [])}
  end

  def handle_event("reset", _, socket) do
    Treelib.PhotoManager.PhotoChecker.update()
    {:noreply, assign(socket, reset: true)}
  end

  def handle_event("relink", _, socket) do
    unlinked_species = Treelib.Tasks.MissingAlbums.process()
    {:noreply, assign(socket, relink: true, unlinked_species: unlinked_species)}
  end
end
