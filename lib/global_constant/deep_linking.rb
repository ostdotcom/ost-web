# frozen_string_literal: true
module GlobalConstant

  class DeepLinking

    class << self

      def android_config
        @andrid_cng ||= begin
          config_file_path = Rails.env.production? ? production_android_config_file_path : staging_android_config_file_path
          YAML.load_file(config_file_path)
        end
      end

      def ios_config
        @ios_cng ||= begin
          config_file_path = Rails.env.production? ? production_ios_config_file_path : staging_ios_config_file_path
          YAML.load_file(config_file_path)
        end
      end

      private

      def staging_ios_config_file_path
        "#{folder}/ios/staging.json"
      end

      def production_ios_config_file_path
        "#{folder}/ios/production.json"
      end

      def staging_android_config_file_path
        "#{folder}/android/staging.json"
      end

      def production_android_config_file_path
        "#{folder}/android/production.json"
      end

      def folder
        "#{Rails.root}/config/deep_linking"
      end

    end

  end

end
