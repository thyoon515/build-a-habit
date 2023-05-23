class CreateTasks < ActiveRecord::Migration[7.0]
  def change
    create_table :tasks do |t|
      t.string :title
      t.date :startDate
      t.date :endDate
      t.boolean :allDay
      t.integer :user_id
      t.integer :category_id
      t.integer :priority_id

      t.timestamps
    end
  end
end
