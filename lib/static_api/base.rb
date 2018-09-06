module StaticApi

  class Base

    include Util::ResultHelper

    require 'net/http'
    require 'cgi'

    # Initialize
    #
    # * Author: Sunil
    # * Date: 28/08/2018
    # * Reviewed By:
    #
    # @param [Hash] headers (optional) - headers that need to be sent to API
    #
    # @return [StaticApi::Base] returns an object of StaticApi::Base class
    #
    def initialize(headers = {})
      @headers = headers
    end

    # private

    # Get request
    #
    # * Author: Sunil
    # * Date: 28/08/2018
    # * Reviewed By:
    #
    # @param [Array] routes (mandatory) - List of API routes
    #
    # @return [Result::Base] returns an object of Result::Base class
    #
    def get(routes)
      send(routes)
    end

    protected

    # Make API Request
    #
    # * Author: Sunil
    # * Date: 28/08/2018
    # * Reviewed By:
    #
    # @param [Array] routes (mandatory) - List of routes to send parallel requests
    #
    # @return [Result::Base] returns an object of Result::Base class
    #
    def send(routes)
      route_content = {}
      queue = Queue.new
      routes.map { |route| queue << route }
      b_uri = URI(base_url)
      threads = parallel_request_count.times.map do
        Thread.new do
          Net::HTTP.start(b_uri.host, b_uri.port,
                          use_ssl: (b_uri.scheme == "https"),
                          verify_mode: (b_uri.scheme == "https" && Rails.env != "development") ? OpenSSL::SSL::VERIFY_PEER : OpenSSL::SSL::VERIFY_NONE) do |http|
            while !queue.empty? && route = queue.pop
              Rails.logger.info("####Sending Request for: #{base_url + route}")
              request_obj = get_request_obj(base_url + route)
              begin
                http_response = http.request(request_obj)
                route_content[route] = {success: true, code: http_response.code, class_name: http_response.class.name, body: http_response.body}
              rescue Net::ReadTimeout, Net::OpenTimeout => e
                # Timeouts
                Rails.logger.info("=*=STATIC-API-ERROR=*= #{e.inspect}")
                route_content[route] = {success: false, error: 'static_api_timeout', e: e}
              rescue Exception => e
                # Exceptions
                Rails.logger.info("=*=STATIC-API-ERROR=*= #{e.inspect}")
                route_content[route] = {success: false, error: 'static_api_exception', e: e}
              end
            end
          end
        end
      end
      threads.each(&:join)

      route_content.each do |route, response|
        if response[:success]
          route_content[route] = parse_api_response(response[:code], response[:class_name], response[:body])
        else
          route_content[route] = exception_with_internal_code(
            response[:e],
            response[:error],
            response[:error],
            GlobalConstant::ErrorCode.internal_server_error,
            debug_data)
        end
      end

      return route_content
    end

    # Get HTTP Request Object
    #
    # * Author: Sunil
    # * Date: 28/08/2018
    # * Reviewed By:
    #
    # @param [String] request_uri (mandatory) - API route
    #
    # @return [Net::HTTP::Get] return request object with headers
    #
    def get_request_obj(request_uri)

      req_obj = Net::HTTP::Get.new(request_uri)

      # Forward headers
      @headers.each do |h, v|
        req_obj[h] = v
      end if @headers.present?

      # Attach basic auth
      req_obj.basic_auth(basic_auth_user, basic_auth_pass) if basic_auth_user.present?
      req_obj

    end

    # Get Basic Auth Username
    #
    # * Author: Sunil
    # * Date: 28/08/2018
    # * Reviewed By:
    #
    # @return [String] return basic auth username
    #
    def basic_auth_user
      return nil
    end

    # Get Basic Auth Password
    #
    # * Author: Sunil
    # * Date: 28/08/2018
    # * Reviewed By:
    #
    # @return [String] return basic auth password
    #
    def basic_auth_pass
      return nil
    end

    # Parallel requests count
    #
    # * Author: Sunil
    # * Date: 28/08/2018
    # * Reviewed By:
    #
    # @return [Integer] return number of parallel requests count
    #
    def parallel_request_count
      return 10
    end

    # Parse API response
    #
    # * Author: Sunil
    # * Date: 28/08/2018
    # * Reviewed By:
    #
    # @param [Integer] code (mandatory) - http response code
    # @param [String] class_name (mandatory) - http response class name
    # @param [String] body (mandatory) - http response body
    #
    # @return [Result::Base] returns an object of Result::Base class
    #
    def parse_api_response(code, class_name, body)

      response_data = Oj.load(body, mode: :strict) rescue nil

      case class_name
        when 'Net::HTTPOK'
          if !response_data.nil?
            # Success
            success_with_data({'api_response' => response_data})
          else
            # API Error
            Rails.logger.info("=*=STATIC-API-ERROR=*= #{body.inspect}")
            error_with_internal_code('static_api_error', 'static api error', GlobalConstant::ErrorCode.internal_server_error, {}, {}, 'Invalid JSON Format')
          end
        when 'Net::HTTPUnauthorized', 'Net::HTTPPreconditionFailed'
          # Login required
          Rails.logger.info("=*=STATIC-API-ERROR=*= Net::HTTPUnauthorized")
          error_with_internal_code('static_api_login_required', 'static api login required', GlobalConstant::ErrorCode.unauthorized_access, {}, {}, 'HTTPUnauthorized')
        when 'Net::HTTPNotFound'
          # Page not found - 404
          Rails.logger.info("=*=STATIC-API-ERROR=*= '404 Not Found'")
          error_with_internal_code('static_api_not_found', 'static api not found', GlobalConstant::ErrorCode.not_found, {}, {}, '404 Not Found')
        else
          # HTTP error status code (500, 504...)
          exception_with_internal_code(
            Exception.new("STATIC API STATUS CODE #{code.to_i}"),
            'static_api_exception',
            'static api exception',
            code,
            debug_data
          )
      end

    end

    # Debug data for exception emails
    #
    # * Author: Sunil
    # * Date: 28/08/2018
    # * Reviewed By:
    #
    # @return [Hash] returns an hash of critical information for debugging
    #
    def debug_data
      {
        base_url: base_url
      }
    end

    # Base url
    #
    # * Author: Sunil
    # * Date: 28/08/2018
    # * Reviewed By:
    #
    # @return [String] returns base url Example: "https://s3.amazonaws.com/"
    #
    def base_url
      raise "base_url is not implemented"
    end

  end

end