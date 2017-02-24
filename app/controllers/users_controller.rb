class UsersController < ApplicationController
  include UsersHelper
  include SessionsHelper

  def show
    @currencies = currency_codes
    @suggested_budget = magic_machine_learning_magic(current_user[:id])
  end

  def create
    @user = User.new(user_params)

    if @user.save
      log_in @user
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
    render json: conversion_rate(conversion_params[:sell_currency])
  end

  private
    def conversion_params
      params.require(:currency).permit(:sell_currency)
    end

    def user_params
      params.require(:user).permit(:username, :email, :password, :password_confirmation)
    end
end
