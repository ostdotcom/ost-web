module UserManagement
  module ContactUsPipeDrive
    class Base < ServicesBase

      # Initialize
      #
      # @params
      #
      # @return [UserManagement::ContactUsPipeDrive::Base]
      #
      def initialize(params)
        super

        @request_params = {}
      end

      private

      # Create a pipedrive deal
      #
      # @return [Result::Base]
      #
      def create_pipe_drive_deal

        path = GlobalConstant::Base.pipedrive['deals_end_point'] + "?api_token=#{GlobalConstant::Base.pipedrive['api_token']}"

        pipe_drive_request = PipeDrive::HttpHelper.new()

        r = pipe_drive_request.send_request_of_type('post', path, @request_params)
        return r unless r.success?

        success
      end

    end
  end
end
