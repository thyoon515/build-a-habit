class Priority < ApplicationRecord
    has_many :tasks
    has_many :categories, through: :tasks

    # before_save :assign_task_color

    # private

    # def assign_task_color
    #     self.color = tasks.first&.color if tasks.present?
    # end
end
