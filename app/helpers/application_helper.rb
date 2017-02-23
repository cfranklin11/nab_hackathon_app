require 'uri'
require 'net/http'

module ApplicationHelper
  def call_nab_fx_api
    url = URI("https://api.developer.nab.com.au/v2/fxrates?v=1")

    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = true
    http.verify_mode = OpenSSL::SSL::VERIFY_NONE

    request = Net::HTTP::Get.new(url)
    request["x-nab-key"] = ENV['NAB_API_KEY']

    response = http.request(request)
    response_hash = JSON.parse(response.read_body)

    return response_hash["fxRatesResponse"]["fxRates"] if response_hash && response_hash["fxRatesResponse"]

    'Call to NAB API did not work'
  end
end
