class Priority < ApplicationRecord
    has_many :tasks
    has_many :categories, through: :tasks

    before_validation :set_color_from_priority, on: :create

    private

    def set_color_from_priority
        self.color = priority.color if priority.present?
    end
end
