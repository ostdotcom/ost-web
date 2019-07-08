# frozen_string_literal: true
module GlobalConstant

  class PepoCampaign

    class << self

      def encrypted_client_id
        config['encrypted_client_id']
      end

      def encrypted_list_id
        config['encrypted_list_id']
      end

      # def subscribe_url
      #   if Rails.env.production?
      #     @subscribe_url ||= "https://platform.ost.com/mainnet/api/test-economy/self-invite"
      #   else
      #     @subscribe_url ||= "https://platform.stagingost.com/mainnet/api/test-economy/self-invite"
      #   end
      #
      # end

      private

      def config
        @config ||= GlobalConstant::Base.pepo_campaign
      end

    end

  end

end
