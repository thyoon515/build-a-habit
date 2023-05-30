class RenameStartDateToStartInTasks < ActiveRecord::Migration[7.0]
  def change
    rename_column :tasks, :startDate, :start
  end
end
