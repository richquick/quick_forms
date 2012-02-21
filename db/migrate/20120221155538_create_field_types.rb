class CreateFieldTypes < ActiveRecord::Migration
  def change
    create_table :field_types do |t|

      t.timestamps
    end
  end
end
