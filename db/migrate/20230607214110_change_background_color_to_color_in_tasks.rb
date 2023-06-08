class ChangeBackgroundColorToColorInTasks < ActiveRecord::Migration[7.0]
  def change
    rename_column :tasks, :backgroundColor, :color
  end
end
