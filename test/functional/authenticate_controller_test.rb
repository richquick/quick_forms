require 'test_helper'

class AuthenticateControllerTest < ActionController::TestCase
  test "should get login" do
    get :login
    assert_response :success
  end

end
