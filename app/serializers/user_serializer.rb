class UserSerializer < ActiveModel::Serializer
  attributes :first_name, :last_name, :email

  has_many :tasks
end
