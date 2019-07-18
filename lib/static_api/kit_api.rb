module StaticApi

  class KitApi < StaticApi::Base

    # Initialize
    #
    #
    # @param [Hash] headers (optional) - headers that need to be sent to API
    #
    # @return [StaticApi::KitApi] returns an object of StaticApi::KitApi class
    #
    def initialize(headers = {})
      super
    end

    # Send popcorn invites
    #
    # @param [Array] routes (mandatory) - list of routes
    #
    # @return [Hash] returns an object of routes and their response as Result::Base
    #
    def send_popcorn_invite(params)
      if params[:email].blank?
        return error_result('l_sa_ka_1',
                            'Mandatory params missing.')
      end
      email = CGI.escape(params[:email])
      route = "#{params[:subenv_url]}/api/test-economy/self-invite?email_address=#{email}&platform_marketing=#{params[:platform_marketing] || 0}&popcorn_wallet=#{params[:popcorn_wallet] || 0}"
      resp = get([route])
      resp[route]
    end

    protected

    # Base url
    #
    # * Author: Mayur
    # * Date: 31/08/2018
    # * Reviewed By:
    #
    # @return [String] returns base url
    #
    def base_url
      GlobalConstant::CompanyOtherProductUrls.kit_root_url
    end

  end

end
