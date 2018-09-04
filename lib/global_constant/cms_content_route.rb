# frozen_string_literal: true
module GlobalConstant

  class CmsContentRoute

    class << self

      def ost_news
        @ost_news ||= "#{route_prefix}?entity_id=1"
      end

      def ost_members_team
        @ost_members_team ||= "#{route_prefix}?entity_id=2"
      end

      def ost_advisors_team
        @ost_advisors_team ||= "#{route_prefix}?entity_id=3"
      end

      def ost_pune_career
        @ost_pune_career ||= "#{route_prefix}?entity_id=6"
      end

      def ost_berlin_career
        @ost_berlin_career ||= "#{route_prefix}?entity_id=5"
      end

      def ost_partner
        @ost_partner ||= "#{route_prefix}?entity_id=4"
      end


      def shorten(route)
        route
      end

      private

      def route_prefix
        @route_prefix ||= "/api/published/preview"
      end

    end

  end

end
