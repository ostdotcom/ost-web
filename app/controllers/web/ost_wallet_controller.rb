class Web::OstWalletController < Web::BaseController

  layout "ost-wallet"

  skip_before_action :basic_auth

  before_action :set_page_meta_info

  def launch
    @launch_data = JSON.parse(params[:ld])
    if !@launch_data['ios_app_download_link'] || !@launch_data['android_app_download_link'] || !@launch_data['token_name']
      render :file => 'public/404.html'
    else
      render 'web/ost_wallet/launch'
    end
  end

  def send_popcorn_invite
    resp = StaticApi::KitApi.new.send_popcorn_invite(params)
    render plain: Oj.dump(resp.to_json, mode: :compat), status: 200
  end

  private

end
