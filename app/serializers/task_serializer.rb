class TaskSerializer < ActiveModel::Serializer
  attributes :id, :title, :startDate, :endDate, :allDay, :user_id, :category_id, :priority_id
end
