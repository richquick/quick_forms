class CreateFormSubmissions < ActiveRecord::Migration
  def change
    create_table :form_submissions do |t|

      t.timestamps
    end
  end
end
