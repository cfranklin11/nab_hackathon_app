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
      sell_currency == exchange_rate["sellCurrency"]
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

      response_hash["fxRatesResponse"]["fxRates"]
    end
end
