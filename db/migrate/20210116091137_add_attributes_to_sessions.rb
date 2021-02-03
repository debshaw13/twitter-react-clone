class AddAttributesToSessions < ActiveRecord::Migration[6.0]
  def change
    add_column    :sessions, :token, :string
    add_reference :sessions, :user, foreign_key: true
    add_timestamps(:sessions, null: false)
  end
end
