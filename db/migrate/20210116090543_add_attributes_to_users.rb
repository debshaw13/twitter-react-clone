class AddAttributesToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column  :users, :username, :string
    add_index   :users, :username
    add_column  :users, :email, :string
    add_index   :users, :email
    add_column  :users, :password, :string
    add_timestamps(:users, null: false)
  end
end
