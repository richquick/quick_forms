QuickForms::Application.routes.draw do
  get "captcha_answer/index"

  get "captcha_answer/new"

  get "captcha_answer/list"

  get "captcha_answer/show"

  get "captcha_answer/edit"

  get "captcha_answer/delete"

  get "form_submission/index"

  get "form_submission/new"

  get "form_submission/list"

  get "form_submission/show"

  get "form_submission/edit"

  get "form_submission/delete"

  get "field_accepted_value/index"

  get "field_accepted_value/new"

  get "field_accepted_value/list"

  get "field_accepted_value/show"

  get "field_accepted_value/edit"

  get "field_accepted_value/delete"

  get "field_type/index"

  get "field_type/new"

  get "field_type/list"

  get "field_type/show"

  get "field_type/edit"

  get "field_type/delete"

  get "field/index"

  get "field/new"

  get "field/list"

  get "field/show"

  get "field/edit"

  get "field/delete"

  get "form/index"

  get "form/new"

  get "form/list"

  get "form/show"

  get "form/edit"

  get "form/delete"

  get "setting/index"

  get "setting/new"

  get "setting/list"

  get "setting/show"

  get "setting/edit"

  get "setting/delete"

  get "user/new"

  get "user/list"

  get "user/show"

  get "user/edit"

  get "user/delete"

  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  match ':controller(/:action(/:id))(.:format)'
end
