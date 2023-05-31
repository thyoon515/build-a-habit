class Task < ApplicationRecord
    belongs_to :user
    belongs_to :category
    belongs_to :priority

    validates :title, presence: true
end
