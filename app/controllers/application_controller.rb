class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :set_request_from_bot_flag
  after_action :set_response_headers

  # Sanitize params
  include Sanitizer
  before_action :sanitize_params

  include CookieConcern
  include ApplicationHelper

  # Page not found action
  #
  def not_found
    res = {
      error: 'ost_page_not_found',
      error_display_text: 'Page not found',
      http_code: GlobalConstant::ErrorCode.not_found
    }
    @response = Result::Base.error(res)
    render_error_response_for(@response)
  end

  private

  # Get user agent
  #
  def http_user_agent
    request.env['HTTP_USER_AGENT'].to_s
  end

  # Set response headers
  #
  def set_response_headers
    response.headers["Content-Type"] = 'text/html; charset=utf-8'
  end

  # set bot request flag in params
  #
  def set_request_from_bot_flag
    res = http_user_agent.match(/\b(Baidu|Baiduspider|Gigabot|Googlebot|thefind|webmeup-crawler.com|libwww-perl|lwp-trivial|msnbot|SiteUptime|Slurp|ZIBB|wget|ia_archiver|ZyBorg|bingbot|AdsBot-Google|AhrefsBot|FatBot|shopstyle|pinterest.com|facebookexternalhit|Twitterbot|crawler.sistrix.net|PolyBot|rogerbot|Pingdom|Mediapartners-Google|bitlybot|BlapBot|Python|www.socialayer.com|Sogou|Scrapy|ShopWiki|Panopta|websitepulse|NewRelicPinger|Sailthru|JoeDog|SocialWire|CCBot|yacybot|Halebot|SNBot|SEOENGWorldBot|SeznamBot|libfetch|QuerySeekerSpider|A6-Indexer|PAYONE|GrapeshotCrawler|curl|ShowyouBot|NING|kraken|MaxPointCrawler|efcrawler|YisouSpider|BingPreview|MJ12bot)\b/i)
    params[:is_bot] = res.present? ? 1 : 0
  end

  # Sanitize params
  #
  def sanitize_params
    sanitize_params_recursively(params)
  end

  # Set page meta info
  #
  def set_page_meta_info(custom_extended_data = {})
    service_response = GetPageMetaInfo.new(
      controller: params[:controller],
      action: params[:action],
      request_url: request.url,
      custom_extended_data: custom_extended_data
    ).perform

    unless service_response.success?
      raise 'Incomplete Page Meta.'
    end

    page_extended_data = service_response.data

    @page_meta_data = page_extended_data[:meta]
    @page_assets_data = page_extended_data[:assets]
  end

  # Render error response for
  #
  # * Author: Kedar
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def render_error_response_for(service_response)

    http_code = service_response.http_code

    @page_assets_data = {specific_js_required: 0}

    # Clean critical data
    service_response.data = {}

    if request.xhr?
      (render plain: Oj.dump(service_response.to_json, mode: :compat), status: http_code) and return
    else
      if http_code == GlobalConstant::ErrorCode.unauthorized_access
        redirect_to :login and return
      elsif http_code == GlobalConstant::ErrorCode.temporary_redirect
        redirect_to '/' and return
      else
        response.headers['Content-Type'] = 'text/html'
        render file: "public/#{http_code}.html", layout: false, status: http_code and return
      end
    end

  end

  # Render API Response
  #
  # * Author: Bala
  # * Date: 30/03/2020
  # * Reviewed By:
  #
  # @param [Result::Base] service_response is an object of Result::Base class
  #
  def render_api_response(service_response)
    # calling to_json of Result::Base
    response_hash = service_response.to_json
    http_status_code = response_hash.delete(:http_code)

    if !service_response.success? # && !Rails.env.development?

      response_hash.delete(:data)
    end
    (render plain: Oj.dump(response_hash, mode: :compat), status: http_status_code)
  end

end
