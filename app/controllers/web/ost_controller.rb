class Web::OstController < Web::BaseController

  layout "ost"

  skip_before_action :basic_auth

  before_action :set_page_meta_info, except: [:kit_redirect, :kyc_redirect, :view_redirect, :ost_circulation]

  def index
    @s3_content = DynamicContent::ForHome.new().perform
  end

  def team
    @s3_content = DynamicContent::ForTeam.new().perform[:data]
    @member_list = @s3_content[GlobalConstant::StaticContentRoute.ost_members_team][:api_response]
    @advisor_list = @s3_content[GlobalConstant::StaticContentRoute.ost_advisors_team][:api_response]
  end

  def privacy
  end

  def terms
  end

  def news
  end

  def careers
    @s3_content = DynamicContent::ForCareer.new().perform[:data]
    @berlin_careers = @s3_content[GlobalConstant::StaticContentRoute.ost_berlin_career][:api_response]
    @pune_careers = @s3_content[GlobalConstant::StaticContentRoute.ost_pune_career][:api_response]
    puts ("berlin careers #{@berlin_careers}")
    puts ("pune careers #{@pune_careers}")
  end

  def documents
  end

  def partners
    @s3_content = DynamicContent::ForPartner.new().perform
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

  def alpha3submissions
    redirect_to "#{GlobalConstant::Base.root_url}", status: GlobalConstant::ErrorCode.temporary_redirect and return
  end

end
