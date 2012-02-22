class UserController < ApplicationController
  
  def index
    list
    render('list')
  end
  
  def new
  end

  def list
    @users = User.order("users.id ASC")
  end

  def show
  end

  def edit
  end

  def delete
  end
end
