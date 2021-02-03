class AddAttributesToTweets < ActiveRecord::Migration[6.0]
  def change
    add_column    :tweets, :message, :string
    add_reference :tweets, :user, foreign_key: true
    add_timestamps(:tweets, null: false)
  end
end
