module DynamicContent

  class Base < ServicesBase

    # Initialize
    #
    # * Author: Mayur
    # * Date: 31-08-2018
    # * Reviewed by: Sunil Khedar
    #
    # @return [DynamicContent::Base]
    #
    def initialize(params = {})
      super
    end

    private

    # Get the appropriate content from desired routes
    #
    # * Author: Mayur
    # * Date: 31-08-2018
    # * Reviewed by: Sunil Khedar
    #
    # @return [Hash] return response of each route
    #
    def get_route_content
      res = is_preview_request? ? StaticApi::Cms.new().get_content_of(get_routes) : CacheManagement::DynamicContent.new(get_routes).fetch
      format_response(res)
    end

    # Check if preview signature is valid and url is not expired
    #
    # * Author: Mayur
    # * Date: 3-09-2018
    # * Reviewed by:
    #
    # @return [Boolean] return boolean value
    #
    def is_preview_request?
      @is_preview_request ||= (@params['ts'].present? && @params['ps'].present?) ? (is_signature_valid? && !has_preview_url_expired?) : false
    end

    # Check if preview url has expired or not (i.e. older than particular threshold time)
    #
    # * Author: Mayur
    # * Date: 3-09-2018
    # * Reviewed by: Sunil Khedar
    #
    # @return [Boolean] return boolean value
    #
    def has_preview_url_expired?
      input_ts = @params['ts'].to_i
      threshold_time = Time.now - 5 * 60 # check if token is older than 5 minutes
      input_ts < threshold_time.to_i
    end

    # Return formatted response
    #
    # * Author: Mayur
    # * Date: 31-08-2018
    # * Reviewed by: Sunil Khedar
    #
    # @return [Hash] return response of each route
    #
    def format_response(response)
      return response unless is_preview_request?
      formated_response = {}
      response.each do |route, res|
        formated_response[route] = res.success? ? res.data : nil
      end
      return formated_response
    end

    # Check if preview signature is valid
    #
    # * Author: Mayur
    # * Date: 3-09-2018
    # * Reviewed by: Sunil Khedar
    #
    # @return [Boolean] return boolean value
    #
    def is_signature_valid?
      @params['ps'] == generate_preview_signature
    end

    # Generate preview signature
    #
    # * Author: Mayur
    # * Date: 3-09-2018
    # * Reviewed by: Sunil Khedar
    #
    # @return [String] returns preview signature
    #
    def generate_preview_signature
      Sha256.new({string: generate_preview_url, salt: GlobalConstant::Base.cms[:sha256_salt]}).perform
    end

    # Generate preview url based on input params
    #
    # * Author: Mayur
    # * Date: 3-09-2018
    # * Reviewed by: Sunil Khedar
    #
    # @return [String] returns preview url
    #
    def generate_preview_url
      GlobalConstant::Base.root_url + @params['path'] + '?ts=' + @params['ts'].to_s
    end

    # Get routes
    #
    # * Author: Sunil
    # * Date: 28/08/2018
    # * Reviewed By:
    #
    # @return [Array] returns list of routes
    #
    def get_routes
      raise "Method not implemented"
    end

  end

end