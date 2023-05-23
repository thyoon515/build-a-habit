class PrioritySerializer < ActiveModel::Serializer
  attributes :order, :color

  has_many :tasks
end
