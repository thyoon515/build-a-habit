class CategorySerializer < ActiveModel::Serializer
  attributes :title

  has_many :tasks
end
