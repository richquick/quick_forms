class UsersController < ApplicationController

  def list
    @users = User.order("users.position ASC")
  end
  
end
