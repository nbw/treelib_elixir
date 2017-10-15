defmodule Treelib.PhotoManager.PhotoAPI do
  @moduledoc """
  Photo API; aka: Flickr API Client

  This could probably be it's own library (probably is),
  but I really only need photosets and photos anyways. 
  """

  @doc """
  Reference: https://www.flickr.com/services/api/flickr.photosets.getList.html
  
  Structure:
    https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key={api_key}&user_id={user_id}&format=json&nojsoncallback=1

  """
  def get_photosets do
    
  end

  @doc """
  Reference: https://www.flickr.com/services/api/flickr.photosets.getPhotos.html

  Structure:
  https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key={api_key}photoset_id={photoset_id}&user_id={user_id}&format=json&nojsoncallback=1
  """
  def get_photos_in_photoset _ps_id do

  end
end
