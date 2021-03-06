class UserController < ApplicationController
  
  def index
    list
    render('list')
  end
  
  
  # Create
  def new
    @user = User.new
  end
  
  def create
    # Instantiate a new object using form parameters
    @user = User.new(params[:user])
    # Save the object
    if @user.save
      # If save succeeds, redirect to the list action
      redirect_to(:action => 'list')
    else
      # If save fails, redisplay the form so user can fix problems
      render('new')
    end
  end

  # Read
  def list
    @users = User.order("users.id ASC")
  end

  def show
    @user = User.find(params[:id])
  end

  # Update
  def edit
    @user = User.find(params[:id])
  end
  
  def update
    # Find object using form parameters
    @user = User.find(params[:id])
    # Update the object
    if @user.update_attributes(params[:user])
      # If update succeeds, redirect to the list action
      redirect_to(:action => 'show', :id => @user.id)
    else
      # If save fails, redisplay the form so user can fix problems
      render('edit')
    end
  end

  # Delete
  def delete
    @user = User.find(params[:id])
  end
  
  def destroy
    User.find(params[:id]).destroy
    redirect_to(:action => 'list')
  end
end
