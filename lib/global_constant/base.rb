# frozen_string_literal: true
module GlobalConstant

  class Base

    class << self

      def environment_name_short
        @environment_name_short ||= Rails.env[0,2]
      end

      def root_url
        @root_url ||= fetch_config.fetch('root_url', '')
      end

      def placeholder_image_src
        @placeholder_image_src ||= fetch_config.fetch('placeholder_image_src', '')
      end

      def cloudfront_config
        @cloudfront ||= fetch_config.fetch('cloudfront', {}).with_indifferent_access
      end

      def basic_auth_config
        @basic_auth_config ||= fetch_config.fetch('basic_auth', {}).with_indifferent_access
      end

      def company_other_product_urls
        @company_other_product_urls ||= fetch_config.fetch('company_other_product_urls', {}).with_indifferent_access
      end
      
      def pepo_campaign
        @stw_campaign_details ||= fetch_config.fetch('pepo_campaign', {}).with_indifferent_access
      end

      def recaptcha
        @recaptcha ||= fetch_config.fetch('recaptcha', {}).with_indifferent_access
      end

      def memcache_config
        @memcache_config ||= fetch_config.fetch('memcached', {}).with_indifferent_access
      end

      def cms
        @cms ||= fetch_config.fetch('cms', {}).with_indifferent_access
      end

      def invision_prototypes
        @invision_prototypes ||= fetch_config.fetch('invision_prototypes', {}).with_indifferent_access
      end

      def pipedrive
        @pipedrive ||= fetch_config.fetch('pipedrive', {}).with_indifferent_access
      end

      private

      def fetch_config
        @fetch_config ||= begin
          template = ERB.new File.new("#{Rails.root}/config/constants.yml").read
          YAML.load(template.result(binding)).fetch('constants', {}) || {}
        end
      end

    end

  end

end
