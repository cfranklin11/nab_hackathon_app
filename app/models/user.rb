class User < ApplicationRecord
  has_and_belongs_to_many :groups

  validates :password, confirmation: true
  # validates :password_digest, presence: true
  validates :email, uniqueness: { case_sensitive: false }, presence: true
  validates :username, uniqueness: true

  has_secure_password
end
