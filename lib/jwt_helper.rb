class JwtHelper
  include Util::ResultHelper

  require 'http'

  # Initialize
  #
  # * Author: Pankaj
  # * Date: 26/07/2019
  # * Reviewed By:
  #
  # @return [SubenvCommunicationApi]
  #
  def initialize
    @timeouts = {
      write: 5,
      connect: 5,
      read: 5
    }
  end

  # Send Api request
  #
  # * Author: Pankaj
  # * Date: 26/07/2019
  # * Reviewed By:
  #
  # @return [Result::Base]
  #
  def send_request_to(request_path, request_type, params)

    begin

      request_obj = HTTP.timeout(@timeouts)

      parameterized_token = {token: get_jwt_token(params)}

      Rails.logger.info ("request_path: #{request_path}")

      # Extract basic auth username and password from url
      parsed_request_path = URI.parse(request_path)
      if parsed_request_path.userinfo.present?
        request_path = parsed_request_path.scheme + "://" + parsed_request_path.hostname + parsed_request_path.request_uri
        Rails.logger.info ("New request_path because of basic auth: #{request_path}")
        request_basic_auth = parsed_request_path.userinfo.split(':')
        request_obj = request_obj.basic_auth(user: request_basic_auth[0], pass: request_basic_auth[1])
      end

      case request_type
      when 'get'
        response = request_obj.get(request_path, params: parameterized_token)
        puts "response: #{response}"
      when 'post'
        response = request_obj.post(request_path, json: parameterized_token)
      else
        return error_with_data(
          'l_sca_1',
          'something_went_wrong',
          GlobalConstant::ErrorAction.default
        )
      end

      parsed_response = Oj.load(response.body.to_s,{})
      Rails.logger.info ("parsed_response: #{parsed_response}")

      if parsed_response.has_key?('success')
        # internal response
        if parsed_response['success']
          return success_with_data(HashWithIndifferentAccess.new(parsed_response['data']))
        else
          return error_with_internal_code(parsed_response['code'],
                                          parsed_response['msg'],
                                          GlobalConstant::ErrorCode.internal_server_error,
                                          {},
                                          {},
                                          'InternalServerError')

        end
      else
        return error_with_internal_code('something_went_wrong',
                                        'something went wrong',
                                        GlobalConstant::ErrorCode.internal_server_error,
                                        {},
                                        {},
                                        'InternalServerError')
      end
    rescue => e
      return error_with_internal_code('something_went_wrong',
                                      'something went wrong',
                                      GlobalConstant::ErrorCode.internal_server_error,
                                      {},
                                      {},
                                      'InternalServerError')
    end
  end

  # Decrypt request
  #
  # * Author: Pankaj
  # * Date: 26/07/2019
  # * Reviewed By:
  #
  # @return [Result::Base]
  #
  def decrypyt_request(params)
    begin
      decoded_token_data = JWT.decode(
        params[:token],
        GlobalConstant::Environment.subenv_communication_secret,
        true,
        {:algorithm => 'HS256'}
      )[0]["data"]

      params[:decoded_token_data] = HashWithIndifferentAccess.new(decoded_token_data)
      return success_with_data(params[:decoded_token_data])
    rescue => e
      return error_with_internal_code('something_went_wrong',
                                      'something went wrong',
                                      GlobalConstant::ErrorCode.internal_server_error,
                                      {},
                                      {},
                                      'InternalServerError')
    end
  end

  # Create encrypted Token for whitelisting parameter
  #
  def get_jwt_token(data)
    payload = {data: data}
    secret_key = GlobalConstant::Environment.subenv_communication_secret

    JWT.encode(payload, secret_key, 'HS256')
  end
end
