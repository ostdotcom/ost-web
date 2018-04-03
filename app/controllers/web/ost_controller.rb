class Web::OstController < Web::BaseController

  layout "ost"

  skip_before_action :basic_auth

  before_action :set_page_meta_info

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

  def product
    redirect_to "#{GlobalConstant::Base.company_other_product_urls['root_url']}", status: GlobalConstant::ErrorCode.permanent_redirect and return
  end

  def about
    redirect_to "#{GlobalConstant::Base.company_other_product_urls['root_url']}/team", status: GlobalConstant::ErrorCode.permanent_redirect and return
  end

end
