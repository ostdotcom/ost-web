class Web::BaseController < ApplicationController

  before_action :basic_auth

  private

  # Render error response pages
  #
  def render_error_response(service_response)
    # Clean critical data
    service_response.data = {}
    render_error_response_for(service_response)
  end

  # basic auth
  #
  # * Author: Puneet
  # * Date: 03/03/2018
  # * Reviewed By:
  #
  def basic_auth

    return if Rails.env.development?

    return if Rails.env.production?

    users = {
      GlobalConstant::BasicAuth.username => GlobalConstant::BasicAuth.password
    }

    authenticate_or_request_with_http_basic do |username, password|
      if users[username].present? && users[username] == password
        true
      else
        false
      end
    end

  end

end