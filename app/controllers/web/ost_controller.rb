class Web::OstController < Web::BaseController

  layout "ost"

  skip_before_action :basic_auth

  before_action :set_page_meta_info, except: [:kit_redirect, :kyc_redirect, :view_redirect, :ost_circulation]

  def index
  end

  def team
  end

  def privacy
  end

  def terms
  end

  def news
  end

  def careers
  end

  def documents
  end

  def partners
  end

  def winners
  end

  def product
    redirect_to "#{GlobalConstant::Base.root_url}", status: GlobalConstant::ErrorCode.permanent_redirect and return
  end

  def about
    redirect_to "#{GlobalConstant::Base.root_url}team", status: GlobalConstant::ErrorCode.permanent_redirect and return
  end

  def kit_redirect
    redirect_to "#{GlobalConstant::CompanyOtherProductUrls.kit_root_url}", status: GlobalConstant::ErrorCode.permanent_redirect and return
  end

  def kyc_redirect
    redirect_to "#{GlobalConstant::CompanyOtherProductUrls.kyc_root_url}", status: GlobalConstant::ErrorCode.permanent_redirect and return
  end

  def view_redirect
    redirect_to "#{GlobalConstant::CompanyOtherProductUrls.view_root_url}", status: GlobalConstant::ErrorCode.permanent_redirect and return
  end

  # Action to show ost in circulation
  #
  # * Author: Puneet
  # * Date: 11/04/2018
  # * Reviewed By:
  #
  def ost_circulation
    render :layout => false
  end

end
