Rails.application.routes.draw do

  scope '', controller: 'web/ost', :format => false do
    get '/' => :index
    get '/team' => :team
    get '/privacy' => :privacy
    get '/terms' => :terms
    # get '/news' => :news
    get '/events-news' => :events_news
    get '/careers' => :careers
    get '/documents' => :documents
    get '/partners' => :partners
    get '/product' => :product
    get '/about' => :about
    get '/kit' => :kit_redirect
    get '/kyc' => :kyc_redirect
    get '/view' => :view_redirect
    get '/challenges' => :winners
    get '/challenges-2' => :alpha3winners
    get '/alpha3submissions' => :alpha3submissions
    get '/ost-in-circulation' => :ost_circulation
    get '/roadmap' => :roadmap
    get '/token-sale-landing' => :token_sale_landing
    get '/faq' => :faq
    get '/solutions' => :solutions
  end

  scope '', controller: 'web/deep_linking', :format => false do
    get '/.well-known/assetlinks.json' => :android_deep_linking_config
    get '/apple-app-site-association' => :ios_deep_linking_config
  end

  scope 'ost-wallet', controller: 'web/ost_wallet', :format => false do
    get '/launch' => :launch
    get '/:subenv_url/test-invite' => :send_popcorn_invite, constraints: lambda { |request| request.xhr? }
  end

  scope ':subenv_url/latest-transactions', controller: 'kit/latest_transaction', :format => false do
    get '' => :get, constraints: lambda { |request| request.xhr? }
  end

  scope ':subenv_url/stats', controller: 'view/stats', :format => false do
    get '' => :get, constraints: lambda { |request| request.xhr? }
  end

  # Route not found handler. Should be the last entry here
  match '*permalink', to: 'application#not_found', via: :all

end
