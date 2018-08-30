# frozen_string_literal: true
module GlobalConstant

  class StaticContentRoute

    class << self

      def ost_news
        @ost_news ||= "#{route_prefix}/news_list.json"
      end

      def ost_members_team
        @ost_members_team ||= "#{route_prefix}/members_list.json"
      end

      def ost_advisors_team
        @ost_advisors_team ||= "#{route_prefix}/advisors_list.json"
      end

      def ost_pune_career
        @ost_pune_career ||= "#{route_prefix}/pune_career_list.json"
      end

      def ost_berlin_career
        @ost_berlin_career ||= "#{route_prefix}/berlin_career_list.json"
      end

      def ost_partner
        @ost_partner ||= "#{route_prefix}/partners_list.json"
      end

      def all_routes
        [
          ost_pune_career,
          ost_berlin_career,
          ost_advisors_team,
          ost_news,




        ]
      end

      def shorten(route)
        route
      end

      private

      def route_prefix
        @route_prefix ||= "/wa.ost.com/#{Rails.env}_ost/json_files"
      end

    end

  end

end
