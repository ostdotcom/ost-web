class Web::OstController < Web::BaseController

  layout "ost"

  skip_before_action :basic_auth

  before_action :set_page_meta_info, except: [:kit_redirect, :kyc_redirect, :view_redirect, :ost_circulation]
  before_action :add_path_to_params

  def index
    @dynamic_content = DynamicContent::ForHome.new(params).perform
    puts "########## dynamic content ### #{@dynamic_content.inspect}"
  end

  def team
    @dynamic_content = DynamicContent::ForTeam.new(params).perform
  end

  def privacy
  end

  def terms
  end

  def news
  end

  def careers
    @dynamic_content = DynamicContent::ForCareer.new(params).perform
  end

  def documents
  end

  def partners
    @dynamic_content = DynamicContent::ForPartner.new(params).perform
  end

  def winners
  end

  def product
    redirect_to "#{GlobalConstant::Base.root_url}", status: GlobalConstant::ErrorCode.permanent_redirect and return
  end

  def about
    redirect_to "#{GlobalConstant::Base.root_url}team", status: GlobalConstant::ErrorCode.permanent_redirect and return
  end

  def alpha3submissions
    redirect_to "#{GlobalConstant::Base.root_url}", status: GlobalConstant::ErrorCode.temporary_redirect and return
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

  def ost_circulation
    render :layout => false
  end

  private

  # Add path to params
  def add_path_to_params
    params['path'] = request.path[1..-1]
  end

  def alpha3winners
  end

end
