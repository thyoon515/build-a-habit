class UsersController < ApplicationController
    before_action :authorize
    skip_before_action :authorize, only: [:create]

    def index
        render json: User.all
    end

    def show
        user = User.find(session[:user_id])
        if user
          render json: user
        else
          render json: { error: "Not authorized" }, status: :unauthorized
        end
    end

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    rescue ActiveRecord::RecordInvalid => e
        render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
    end

    private

    def user_params
        params.permit(:first_name, :last_name, :password, :email)
    end
  
    def authorize
        return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
    end
end
