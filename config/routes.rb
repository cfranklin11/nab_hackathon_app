Rails.application.routes.draw do
  root 'static_pages#home'

  post '/login', to: 'sessions#create'
  post '/logout', to: 'sessions#destroy'

  get '/convert', to: 'users#get_conversion_rate'
  get '/cities', to: 'groups#get_cities'
  post '/users/:user_id/groups/:id/restaurants', to: 'groups#get_restaurants'


  resources :users do
    resources :groups
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
