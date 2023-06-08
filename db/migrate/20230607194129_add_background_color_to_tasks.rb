class AddBackgroundColorToTasks < ActiveRecord::Migration[7.0]
  def change
    add_column :tasks, :backgroundColor, :string
  end
end
