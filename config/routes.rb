Rails.application.routes.draw do
  resources :tasks
  resources :priorities, only: [:index]
  resources :categories, only: [:index]
  resources :users, only: [:show, :create]

  post "/login", to: "sessions#create"
  get "/me", to: "users#show"
  delete "/logout", to: "sessions#destroy"

  get '*path',
  to: 'fallback#index',
  constraints: ->(req) { !req.xhr? && req.format.html? }
end
