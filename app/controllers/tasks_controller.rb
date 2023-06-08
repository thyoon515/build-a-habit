class TasksController < ApplicationController
    # before_action :authorize
    # skip_before_action :authorize, only: [:index]
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    def index
        render json: Task.all
    end

    def show
        task = find_task
        render json: task
    end

    def create
        user = User.find(session[:user_id])
        task = user.tasks.create!(task_params)
        render json: task, status: :created
    end

    def destroy
        task = find_task
        task.destroy
        render json: task
    end

    def update
        task = find_task
        task.update!(task_params)
        render json: task, status: :accepted
    end

    private

    def find_task
        user = User.find(session[:user_id])
        user.tasks.find(params[:id])
    end

    def task_params
        params.permit(:title, :start, :end, :allDay, :category_id, :priority_id, :color)
    end

    def render_not_found_response
        render json: { error: "Task not found" }, status: :not_found
    end

    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    def authorize
        return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
    end

end
