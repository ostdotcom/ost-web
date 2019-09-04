class Kit::LatestTransactionController < ApplicationController

  def get
    request_path = "#{GlobalConstant::CompanyOtherProductUrls.kit_root_url}#{params[:subenv_url]}/api/latest-transaction"
    service_response = JwtHelper.new.send_request_to(request_path, 'get', {})
      if service_response.error
        render plain: Oj.dump(service_response.to_json, mode: :compat), status: 500
      else
        render plain: Oj.dump(service_response.to_json, mode: :compat), status: 200
      end
  end

end