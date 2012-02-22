class CreateFieldAcceptedValues < ActiveRecord::Migration
  def change
    create_table :field_accepted_values do |t|

      t.timestamps
    end
  end
end
