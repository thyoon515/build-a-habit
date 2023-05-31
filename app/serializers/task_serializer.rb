class TaskSerializer < ActiveModel::Serializer
  attributes :title, :start, :end, :allDay

  belongs_to :user
  belongs_to :category
  belongs_to :priority

end
