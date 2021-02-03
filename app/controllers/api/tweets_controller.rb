module Api
  class TweetsController < ApplicationController
    def create
      token = cookies.signed[:twitter_session_token]
      session = Session.find_by(token: token)
      user = session.user
      @tweet = user.tweets.new(tweet_params)

      if @tweet.save
        render json: {
          tweet: {
            username: user.username,
            message: @tweet.message
          }
        }
      else
        render json: {
          success: false
        }
      end
    end

    def destroy
      token = cookies.signed[:twitter_session_token]

      if token
        session = Session.find_by(token: token)
        user = session.user

        @tweet = user.tweets.find_by(id: params[:id])

        if @tweet and @tweet.destroy
          render json: { success: true }
        else
          render json: { success: false }
        end
      else
        render json: { success: false }
      end
    end

    def index
      @tweets = Tweet.all.order(created_at: :desc)
      render 'tweets/index'
    end

    def index_by_user
      user = User.find_by(username: params[:username])

      if user
        @tweets = user.tweets.all.order(created_at: :desc)
        render 'tweets/index_by_user'
      end
    end

    def search
    end

    private

      def tweet_params
        params.require(:tweet).permit(:message)
      end
  end
end
