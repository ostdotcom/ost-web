# frozen_string_literal: true
module GlobalConstant

  class StaticContentFileName

    class << self

      def ost_news
        @ost_news ||= "news_list.json"
      end

      def ost_uber_banner
        @ost_uber_banner ||= "uber_banner.json"
      end

      def ost_members_team
        @ost_members_team ||= "members_list.json"
      end

      def ost_events
        @ost_events ||= "upcoming_events_list.json"
      end

      def ost_advisors_team
        @ost_advisors_team ||= "advisors_list.json"
      end

      def ost_pune_career
        @ost_pune_career ||= "pune_career_list.json"
      end

      def ost_hong_kong_career
        @ost_hong_kong_career ||= "hongkong_career_list.json"
      end

      def ost_new_york_career
        @ost_new_york_career ||= "new_york_career_list.json"
      end

      def ost_europe_career
        @ost_europe_career ||= "europe_career_list.json"
      end

      def ost_berlin_career
        @ost_berlin_career ||= "berlin_career_list.json"
      end

      def ost_partner
        @ost_partner ||= "partners_list.json"
      end

      def ost_partners_sprite
        @ost_partners_sprite ||= "partners_sprite.json"
      end

      def ost_home_page_jumbotron
        @ost_home_page_jumbotron ||= "home_page_jumbotron.json"
      end

      def all_file_names
        [
            ost_news,
            ost_uber_banner,
            ost_events,
            ost_members_team,
            ost_advisors_team,
            ost_pune_career,
            ost_berlin_career,
            ost_europe_career,
            ost_hong_kong_career,
            ost_new_york_career,
            ost_partner,
            ost_partners_sprite,
            ost_home_page_jumbotron
        ]
      end

      def shorten(route)
        route
      end

    end

  end

end
