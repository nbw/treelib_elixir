defmodule TreelibWeb.SessionAuth do
	@moduledoc """
	  Responsible for checking the current_user's admin status.
	"""
	alias Plug.Conn
	alias Treelib.UserManager.AuthAdmin

	
  	def auth_admin(%Conn{} = conn),
  		do: AuthAdmin.auth_admin(conn.assigns[:current_user])
end