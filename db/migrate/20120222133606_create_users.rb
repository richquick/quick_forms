class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string "email", :default => "", :null => false
      t.string "password", :null => false
      t.boolean "active"
      t.timestamps
    end
  end
end
