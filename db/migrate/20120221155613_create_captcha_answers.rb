class CreateCaptchaAnswers < ActiveRecord::Migration
  def change
    create_table :captcha_answers do |t|

      t.timestamps
    end
  end
end
