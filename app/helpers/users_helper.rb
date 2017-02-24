require 'uri'
require 'net/http'
require 'json'

module UsersHelper
  def currency_codes
    currency_exchange_rates.map do |exchange_rate|
      exchange_rate["buyCurrency"]
    end
  end

  def conversion_rate(sell_currency)
    requested_exchange = currency_exchange_rates.select do |exchange_rate|
      sell_currency == exchange_rate["buyCurrency"]
    end

    if requested_exchange.first
      # Buy & sell rates are for foreign currency priced in AUD,
      # and are in terms of buying/selling that foreign currency
      return requested_exchange.first["currentSellRate"]
    end

    return nil;
  end

  private
    def currency_exchange_rates
      api_key = ENV['NAB_API_KEY']
      url = URI("https://api.developer.nab.com.au/v2/fxrates?v=1")

      http = Net::HTTP.new(url.host, url.port)
      http.use_ssl = true
      http.verify_mode = OpenSSL::SSL::VERIFY_NONE

      request = Net::HTTP::Get.new(url)
      request["x-nab-key"] = api_key

      response = http.request(request)
      response_hash = JSON.parse(response.read_body)

      if response_hash && response_hash["fxRatesResponse"]
        response_hash["fxRatesResponse"]["fxRates"]
      end
    end

    def get_auth_token
      api_key = ENV['NAB_HACK_KEY']
      url = URI("https://hackathon.api.extnp.nab.com.au/v2/auth?v=1")

      http = Net::HTTP.new(url.host, url.port)
      http.use_ssl = true
      http.verify_mode = OpenSSL::SSL::VERIFY_NONE

      request = Net::HTTP::Post.new(url)
      request["content-type"] = 'application/json'
      request["x-nab-key"] = api_key
      request.body = "{\r\n\t\"loginRequest\": {\r\n\t\t\"brand\": \"nab\",\r\n\t\t\"lob\": \"nab\",\r\n\t\t\"credentials\": {\r\n\t\t\t\"apiStructType\": \"usernamePassword\",\r\n\t\t\t\"usernamePassword\": {\r\n\t\t\t\t\"username\": \"10055670\",\r\n\t\t\t\t\"password\": \"aaa111\"\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n}"

      response = http.request(request)
      response_hash = JSON.parse(response.read_body)

      response_hash["loginResponse"]["tokens"].first["value"]
    end

    def account_list(token)
      url = URI("https://hackathon.api.extnp.nab.com.au/v2/accounts?v=1&category=domestic")

      http = Net::HTTP.new(url.host, url.port)
      http.use_ssl = true
      http.verify_mode = OpenSSL::SSL::VERIFY_NONE

      request = Net::HTTP::Get.new(url)
      request["content-type"] = 'application/json'
      request["x-nab-key"] = ENV['NAB_HACK_KEY']
      request["authorization"] = token
      request.body = "{\r\n\t\"loginRequest\": {\r\n\t\t\"brand\": \"nab\",\r\n\t\t\"lob\": \"nab\",\r\n\t\t\"credentials\": {\r\n\t\t\t\"apiStructType\": \"usernamePassword\",\r\n\t\t\t\"usernamePassword\": {\r\n\t\t\t\t\"username\": \"10055670\",\r\n\t\t\t\t\"password\": \"aaa111\"\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n}"

      response = http.request(request)
      response_hash = JSON.parse(response.read_body)

      {
        auth_token: token,
        account_token: response_hash["accountsResponse"]["accounts"].first["accountToken"]
      }
    end

    def account_balance(auth_token: '', account_token: '')
      url = URI("https://hackathon.api.extnp.nab.com.au/v2/account/" + account_token + "/balance?v=1")

      http = Net::HTTP.new(url.host, url.port)
      http.use_ssl = true
      http.verify_mode = OpenSSL::SSL::VERIFY_NONE

      request = Net::HTTP::Get.new(url)
      request["content-type"] = 'application/json'
      request["x-nab-key"] = ENV['NAB_HACK_KEY']
      request["authorization"] = auth_token
      request.body = "{\r\n\t\"loginRequest\": {\r\n\t\t\"brand\": \"nab\",\r\n\t\t\"lob\": \"nab\",\r\n\t\t\"credentials\": {\r\n\t\t\t\"apiStructType\": \"usernamePassword\",\r\n\t\t\t\"usernamePassword\": {\r\n\t\t\t\t\"username\": \"10055670\",\r\n\t\t\t\t\"password\": \"aaa111\"\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n}"

      response = http.request(request)
      response_hash = JSON.parse(response.read_body)

      response_hash["accountBalanceResponse"]["account"]["balance"]["amountBalance"]["availableBalance"]["amount"].to_f
    end

    # TODO: Figure out how to implement machine learning to estimate how much the user can actually spend
    def magic_machine_learning_magic(user_id)
      # TODO: Use user_id to access the correct bank account
      remaining_balance = account_balance(account_list(get_auth_token))
      day = Time.now.strftime("%d")

      remaining_balance.to_f / (30 - day.to_i)
    end
end
