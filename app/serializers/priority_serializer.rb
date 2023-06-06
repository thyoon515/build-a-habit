class PrioritySerializer < ActiveModel::Serializer
  attributes :id, :order, :color

  has_many :tasks
end
