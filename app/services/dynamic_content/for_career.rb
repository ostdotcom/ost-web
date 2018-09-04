module DynamicContent

  class ForCareer < ServicesBase

    # Initialize
    #
    # * Author: Sunil
    # * Date: 28/08/2018
    # * Reviewed By:
    #
    # @return [DynamicContent::ForCareer]
    #
    def initialize(params = {})
      super
    end

    # Perform
    #
    # * Author: Sunil
    # * Date: 28/08/2018
    # * Reviewed By:
    #
    # @return [Result::Base]
    #
    def perform

      r = validate_and_sanitize
      return r unless r.success?

      success_with_data(get_route_content)
    end

    private

    # Validate and sanitize
    #
    # * Author: Sunil
    # * Date: 28/08/2018
    # * Reviewed By:
    #
    # @return [Result::Base]
    #
    def validate_and_sanitize
      validate
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
      [GlobalConstant::StaticContentRoute.ost_pune_career, GlobalConstant::StaticContentRoute.ost_berlin_career]
    end

    # Get preview routes
    #
    # * Author: Mayur
    # * Date: 03/09/2018
    # * Reviewed By:
    #
    # @return [Array] returns list of routes
    #
    def get_preview_routes
      [GlobalConstant::CmsContentRoute.ost_pune_career, GlobalConstant::CmsContentRoute.ost_berlin_career]
    end

  end

end