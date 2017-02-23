class StaticPagesController < ApplicationController
  include ApplicationHelper

  def home
  end

  def data
    render json: call_nab_fx_api
  end
end
