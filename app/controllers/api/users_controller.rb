module Api
  class UsersController < ApplicationController
    def create
      @user = User.new(user_params)

      if @user.save
        session = @user.sessions.create
        cookies.permanent.signed[:twitter_session_token] = {
          value: session.token,
          httponly: true
        }

        render json: {
          user: {
            username: @user.username,
            email: @user.email
          }
        }
      else
        render json: {
          success: false
        }
      end
    end

    private

      def user_params
        params.require(:user).permit(:username, :email, :password)
      end
  end
end
