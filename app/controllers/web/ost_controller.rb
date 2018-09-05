class Web::OstController < Web::BaseController

  layout "ost"

  skip_before_action :basic_auth

  before_action :set_page_meta_info, except: [:kit_redirect, :kyc_redirect, :view_redirect, :ost_circulation]
  before_action :add_path_to_params

  def index
    @s3_content = DynamicContent::ForHome.new(params).perform
    @news = get_content_for("ost_news")
  end

  def team
    @s3_content = DynamicContent::ForTeam.new(params).perform
    @member_list = get_content_for("ost_members_team")
    @advisor_list = get_content_for("ost_advisors_team")

  end

  def privacy
  end

  def terms
  end

  def news
  end

  def careers
    @s3_content = DynamicContent::ForCareer.new(params).perform
    @berlin_careers = get_content_for("ost_berlin_career")
    @pune_careers = get_content_for("ost_pune_career")
  end

  def documents
  end

  def partners
    @s3_content = DynamicContent::ForPartner.new(params).perform
    @partners = get_content_for("ost_partner")
    puts "Partners data #{@partners.inspect}"
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


  private




  # Get content for
  #
  # * Author: Mayur
  # * Date: 31/08/2018
  # * Reviewed By:
  #
  def get_content_for(entity)

    if ServicesBase.new(params).preview_request
      get_preview_content(entity)
    else
      get_published_content(entity)
    end

  end


  # Get preview content
  #
  # * Author: Mayur
  # * Date: 31/08/2018
  # * Reviewed By:
  #
  def get_preview_content(entity)
    list = @s3_content[:data][GlobalConstant::CmsContentRoute.public_send(entity)][:data][:api_response]["data"]["list"]
    list.map! { |element | element["record"]}
  end


  # Get published content
  #
  # * Author: Mayur
  # * Date: 31/08/2018
  # * Reviewed By:
  #
  def get_published_content(entity)
    api_response  = @s3_content[:data][GlobalConstant::StaticContentRoute.public_send(entity)][:api_response]
    api_response ? api_response : []
  end


  # Add path to params
  #
  # * Author: Mayur
  # * Date: 31/08/2018
  # * Reviewed By:
  #
  def add_path_to_params
    params['path'] = request.path[1..-1]
  end



end
