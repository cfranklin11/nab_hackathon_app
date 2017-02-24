class UsersController < ApplicationController
  include UsersHelper
  include SessionsHelper

  def show
    @currencies = currency_codes
  end

  def create
    @user = User.new(user_params)

    if @user.save
      log_in @user
      flash[:success] = "Welcome to the Sample App!"
      redirect_to @user
    else
      redirect_to root_path
    end
  end

  def destroy
    @user = User.find(current_user[:id])
    @user.delete

    redirect root_path
  end

  def edit
  end

  def get_conversion_rate
    @conversion_rate = conversion_rate(conversion_params)
  end

  private
    def conversion_params
      params.require(:currency).permit(:sell_currency)
    end

    def user_params
      params.require(:user).permit(:username, :email, :password, :password_confirmation)
    end
end
