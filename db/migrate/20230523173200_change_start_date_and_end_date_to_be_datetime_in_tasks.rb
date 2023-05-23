class ChangeStartDateAndEndDateToBeDatetimeInTasks < ActiveRecord::Migration[7.0]
  def change
    change_column :tasks, :startDate, :datetime
    change_column :tasks, :endDate, :datetime
  end
end
