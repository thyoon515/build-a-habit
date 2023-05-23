class TaskSerializer < ActiveModel::Serializer
  attributes :title, :startDate, :endDate, :allDay

  belongs_to :user
  belongs_to :category
  belongs_to :priority

end
