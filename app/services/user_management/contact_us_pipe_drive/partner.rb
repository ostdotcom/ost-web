module UserManagement
  module ContactUsPipeDrive

    class Partner < Base
      # Initialize
      #
      # @params [String] full_name (mandatory) - full name
      # @params [String] email (mandatory) - email
      # @params [String] company (mandatory) - company
      # @params [String] project_description (optional) - Project description
      #
      # @return [UserManagement::ContactUsPipeDrive::Partner]
      #
      def initialize(params)
        super

        @full_name = @params[:full_name]
        @company = @params[:company]
        @email = @params[:email]
        @project_description = @params[:project_description]

        @error_data = {}
      end

      # Perform
      #
      # @return [Result::Base]
      #
      def perform
        r = validate_and_sanitize
        return r unless r.success?

        build_request_params

        r = create_pipe_drive_deal
        return r unless r.success?

        success
      end

      private

      # Validate
      #
      # @return [Result::Base]
      #
      def validate_and_sanitize

        @full_name = @full_name.to_s.strip
        @company = @company.to_s.strip
        @email = @email.to_s.strip
        @project_description = @project_description.to_s.strip

        @error_data[:full_name] = 'Full Name is required.' if !@full_name.present?
        @error_data[:company] = 'Company name is required.' if !@company.present?
        @error_data[:email] = 'Please enter a valid email address' unless Util::CommonValidateAndSanitize.is_valid_email?(@email)

        return error_with_internal_code(
            'um_cupd_p_1',
            '',
            GlobalConstant::ErrorCode.internal_server_error,
            {},
            @error_data
        )# if @error_data.present?

        success
      end

      # Build params for request
      #
      # @return [Result::Base]
      #
      def build_request_params
        @request_params = {
            title: @company,
            person_id: @full_name + ' ' + @email,
            org_id: @company,
            stage_id: GlobalConstant::Base.pipedrive['partners_init_stage_id']
        }

        @request_params[GlobalConstant::Base.pipedrive['project_description_key']] = @project_description if @project_description
        @request_params['user_id'] = GlobalConstant::Base.pipedrive['default_partner_deal_owner']

        @request_params
      end

    end
  end
end
