class Category < ApplicationRecord
    has_many :tasks
    has_many :priorities, through: :tasks

    validates :title, presence: true, uniqueness: true
end
