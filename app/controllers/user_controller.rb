class UserController < ApplicationController
  
  def index
    list
    render('list')
  end
  
  def new
    @user = User.new
  end
  
  def create
    # Instantiate a new object using form parameters
    @user = User.new(params[:subject])
    # Save the object
    if @user.save
      # If save succeeds, redirect to the list action
      redirect_to(:action => 'list')
    else
      # If save fails, redisplay the form so user can fix problems
      render('new')
    end
  end

  def list
    @users = User.order("users.id ASC")
  end

  def show
    @user = User.find(params[:id])
  end

  def edit
    @user = User.find(params[:id])
  end
  
  def update
    # Find object using form parameters
    @user = User.find(params[:id])
    # Update the object
    if @user.update_attributes(params[:subject])
      # If update succeeds, redirect to the list action
      redirect_to(:action => 'show', :id => @user.id)
    else
      # If save fails, redisplay the form so user can fix problems
      render('edit')
    end
  end

  def delete
    @user = User.find(params[:id])
  end
  
  def destroy
    User.find(params[:id]).destroy
    redirect_to(:action => 'list')
  end
end
