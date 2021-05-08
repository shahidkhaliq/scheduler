class CreateShifts < ActiveRecord::Migration[6.1]
  def change
    create_table :shifts do |t|
      t.references :employee, null: false, foreign_key: true
      t.integer :day
      t.string :start_at
      t.string :end_at
      t.integer :duration
      t.string :role
      t.string :color

      t.timestamps
    end
  end
end
