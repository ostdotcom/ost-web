module PipeDrive

    class HttpHelper

      include Util::ResultHelper

      require 'http'
      require 'openssl'

      # Initialize
      #
      # @return [PipeDrive::HttpHelper]
      #
      def initialize
        @timeouts = {write: 5, connect: 5, read: 5}
      end

      # Send Api request
      #
      # @return [Result::Base] returns an object of Result::Base class
      #
      def send_request_of_type(request_type, request_path, params)
        begin

          # It overrides verification of SSL certificates
          ssl_context = OpenSSL::SSL::SSLContext.new
          ssl_context.verify_mode = OpenSSL::SSL::VERIFY_NONE

          case request_type
            when 'get'
              response = HTTP.timeout(@timeouts)
                             .get(request_path, params: params, ssl_context: ssl_context)
            when 'post'
              response = HTTP.timeout(@timeouts)
                             .post(request_path, json: params, ssl_context: ssl_context)
            else
              return error_with_internal_code(
                  'pd_hh_1',
                  "Request type not implemented: #{request_type}",
                  GlobalConstant::ErrorAction.default,
                  {},
                  {},
                  "Something Went Wrong.",
              )
          end

          parsed_response = Oj.load(response.to_s)

          case response.status
            when 200, 201
              if parsed_response['success']
                return success_with_data(HashWithIndifferentAccess.new(parsed_response['data']))
              else
                return error_with_internal_code(
                    parsed_response['error']+':st(pd_hh_2)',
                    "Error in API call: #{response.status} - #{parsed_response['error_info']}",
                    GlobalConstant::ErrorAction.default,
                    {},
                    {},
                    'Something Went Wrong.'
                )
              end
            else
              return error_with_internal_code(
                  'pd_hh_3',
                  "Error in API call: #{response.status} - #{parsed_response['error']}",
                  GlobalConstant::ErrorAction.default,
                  {},
                  {},
                  'Something Went Wrong.'
              )
          end
        rescue => e
          return error_with_internal_code(
              'pd_hh_4',
              "Exception in API call: #{e.message}",
              GlobalConstant::ErrorAction.default,
              {},
              {},
              'Something Went Wrong.'
          )
        end
      end

    end
end