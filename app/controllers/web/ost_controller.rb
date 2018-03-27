class Web::OstController < Web::BaseController

  layout "ost"

  skip_before_action :basic_auth

  before_action :set_page_meta_info

  def index

  end

end
