class StaticPagesController < ApplicationController
  include UsersHelper

  def home
    @user = User.new
    @currencies = currency_codes
  end
end
