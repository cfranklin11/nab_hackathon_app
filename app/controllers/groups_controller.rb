class GroupsController < ApplicationController
  def create
    @group = Groups.new(group_params)

    return @group if @group.save

    redirect user_path(current_user)
  end

  def show
  end

  def delete
  end

  def get_cities
    render json: restaurant_cities(city_params[:query])
  end

  def get_restaurants
    render json: restaurants(restaurant_params[:city_id], restaurant_params[:query], restaurant_params[:max_budget])
  end

  private
    def group_params
      params.require(:group).permit(:name)
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

    def restaurants(city_id, query, max_budget)
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
