class Web::DeepLinkingController < Web::BaseController

  skip_before_action :basic_auth

  def index

  end

  def android_deep_linking_config
    render plain: Oj.dump(GlobalConstant::DeepLinking.android_config, mode: :compat), status: 200
  end

  def ios_deep_linking_config
    render plain: Oj.dump(GlobalConstant::DeepLinking.ios_config, mode: :compat), status: 200
  end

  private

  # Set response headers
  #
  def set_response_headers
    response.headers["Content-Type"] = 'application/json; charset=utf-8'
  end

end
