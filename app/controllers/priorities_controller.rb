class PrioritiesController < ApplicationController

    def index
        render json: Priority.all
    end

end
