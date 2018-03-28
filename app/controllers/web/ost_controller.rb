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


end
