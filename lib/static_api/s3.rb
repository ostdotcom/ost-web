module StaticApi

  class S3 < StaticApi::Base

    # Initialize
    #
    # * Author: Sunil
    # * Date: 28/08/2018
    # * Reviewed By:
    #
    # @param [Hash] headers (optional) - headers that need to be sent to API
    #
    # @return [StaticApi::S3] returns an object of StaticApi::S3 class
    #
    def initialize(headers = {})
      super
    end

    # get content of specified files
    #
    # * Author: Sunil
    # * Date: 28/08/2018
    # * Reviewed By:
    #
    # @param [Array] routes (mandatory) - list of routes
    #
    # @return [Hash] returns an object of routes and their response as Result::Base
    #
    def get_content_of(routes)
      get(routes)
    end

    protected

    # Base url
    #
    # * Author: Sunil
    # * Date: 28/08/2018
    # * Reviewed By:
    #
    # @return [String] returns base url
    #
    def base_url
      "http://s3.amazonaws.com/"
    end

  end

end
