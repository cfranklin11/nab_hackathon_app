Rails.application.routes.draw do
  root 'static_pages#home'

  get '/data', to: 'static_pages#data'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
