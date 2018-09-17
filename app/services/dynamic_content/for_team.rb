module DynamicContent

  class ForTeam < Base

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

    # Get routes
    #
    # * Author: Sunil
    # * Date: 28/08/2018
    # * Reviewed By:
    #
    # @return [Array] returns list of routes
    #
    def get_routes
      [GlobalConstant::StaticContentFileName.ost_members_team, GlobalConstant::StaticContentFileName.ost_advisors_team]
    end

  end

end