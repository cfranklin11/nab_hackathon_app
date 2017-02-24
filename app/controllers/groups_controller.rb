class GroupsController < ApplicationController
  include UsersHelper
  include SessionsHelper

  def create
    @group = current_user.groups.new(name: group_params[:name])

    render json: { newPath: user_group_path(current_user, @group) } if @group.save

    # redirect_to user_group_path(current_user, @group) if @group.save
  end

  def show
    @suggested_budget = session[:budget]

    # TODO: Incorporate friends association with User model and add to groups#show
    render 'show'
  end

  def delete
  end

  def index
  end

  def get_conversion_rate
    render json: conversion_rate(conversion_params[:sell_currency])
  end

  # TODO: Functionality for inviting users with real-time interaction via PubNub
  def invite_user(user_id)
    @guests ||= []
    @guests << User.find(user_id) if User.find(user_id)
  end

  def

  def get_cities
    render json: restaurant_cities(city_params[:query])
  end

  def get_restaurants
    render json: restaurants(restaurant_params[:query], restaurant_params[:max_budget], restaurant_params[:city_id])
  end

  private
    def conversion_params
      params.require(:currency).permit(:sell_currency)
    end

    def group_params
      params.require(:group).permit(:name, :user_id)
    end

    def city_params
      params.require(:city).permit(:query)
    end

    def restaurant_params
      params.require(:restaurant).permit(:max_budget, :city_id, :query)
    end

    def restaurant_cities(city_name)
      api_key = ENV['ZOMATO_API_KEY']
      url = URI("https://developers.zomato.com/api/v2.1/cities?q=" + city_name)

      http = Net::HTTP.new(url.host, url.port)
      http.use_ssl = true
      http.verify_mode = OpenSSL::SSL::VERIFY_NONE

      request = Net::HTTP::Get.new(url)
      request["user-key"] = api_key

      response = http.request(request)
      response_hash = JSON.parse(response.read_body)

      if response_hash && response_hash["location_suggestions"]
        response_hash["location_suggestions"].map do |location|
          {
            id: location["id"],
            name: location["name"]
          }
        end
      end
    end

    def restaurants(query, max_budget, city_id)
      api_key = ENV['ZOMATO_API_KEY']
      url = URI("https://developers.zomato.com/api/v2.1/search?q=" + query + "&entity_id=" + city_id + "&entity_type=city&sort=rating&order=desc")

      http = Net::HTTP.new(url.host, url.port)
      http.use_ssl = true
      http.verify_mode = OpenSSL::SSL::VERIFY_NONE

      request = Net::HTTP::Get.new(url)
      request["user-key"] = api_key

      response = http.request(request)
      response_hash = JSON.parse(response.read_body)

      budget_restaurants = response_hash["restaurants"].select do |restaurant|
        restaurant[:average_cost_for_two].to_f <= max_budget.to_f * 2
      end

      budget_restaurants.map do |restaurant_data|
        restaurant = restaurant_data["restaurant"]

        {
          name: restaurant["id"],
          url: restaurant["name"],
          address: restaurant["location"]["address"],
          cuisines: restaurant["cuisines"],
          average_cost_for_two: restaurant["average_cost_for_two"],
          rating: {
            rating_text: restaurant["user_rating"]["rating_text"],
            rating_number: restaurant["user_rating"]["aggregate_rating"]
          }
        }
      end
    end
end
