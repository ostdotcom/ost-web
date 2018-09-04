module DynamicContent

  class ForTeam < ServicesBase

    # Initialize
    #
    # * Author: Sunil
    # * Date: 28/08/2018
    # * Reviewed By:
    #
    # @return [DynamicContent::ForTeam]
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

    # Get route content
    #
    # * Author: Sunil
    # * Date: 28/08/2018
    # * Reviewed By:
    #
    # @return [Hash] returns list of routes and their content
    #


    # Get routes
    #
    # * Author: Sunil
    # * Date: 28/08/2018
    # * Reviewed By:
    #
    # @return [Array] returns list of routes
    #
    def get_routes
      [GlobalConstant::StaticContentRoute.ost_members_team, GlobalConstant::StaticContentRoute.ost_advisors_team]
    end

    # Get routes
    #
    # * Author: Mayur
    # * Date: 31/08/2018
    # * Reviewed By:
    #
    # @return [Array] returns list of routes
    #
    def get_preview_routes
      [GlobalConstant::CmsContentRoute.ost_members_team, GlobalConstant::CmsContentRoute.ost_advisors_team]
    end

  end

end