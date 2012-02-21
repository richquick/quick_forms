class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string "email", :default => "", :null => false
      t.string "password_hash", :null => false
      t.boolean "active"
      t.timestamps
      t.timestamps
    end
  end
end
