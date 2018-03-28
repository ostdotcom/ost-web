Rails.application.routes.draw do

  scope '', controller: 'web/ost' do
    get '/' => :index
    get '/team' => :team
    get '/privacy' => :privacy
    get '/terms' => :terms
    get '/news' => :news
    get '/careers' => :careers
    get '/documents' => :documents
    get '/partners' => :partners
  end

  # Route not found handler. Should be the last entry here
  match '*permalink', to: 'application#not_found', via: :all

end