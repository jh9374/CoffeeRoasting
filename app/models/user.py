from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  username = db.Column(db.String(40), nullable = False, unique = True)
  email = db.Column(db.String(255), nullable = False, unique = True)
  hashed_password = db.Column(db.String(255), nullable = False)
  profile_image_url = db.Column(db.String, nullable=True)
  bio = db.Column(db.Text, nullable=True)
  street_address = db.Column(db.String, nullable=True)
  city = db.Column(db.String, nullable=True)
  state = db.Column(db.String, nullable=True)
  zipcode = db.Column(db.String, nullable=True)
  created_at = db.Column(db.DateTime, server_default=db.func.now())
  updated_at = db.Column(db.DateTime, server_default=db.func.now())

  # associations
  roasters = db.relationship("Roaster", back_populates="users", cascade="all, delete-orphan")
  images = db.relationship("Image", back_populates="users", cascade="all, delete-orphan")
  likes = db.relationship("Like", back_populates="users", cascade="all, delete-orphan")
  orders = db.relationship("Order", back_populates="users", cascade="all, delete-orphan")
  reviews = db.relationship("Review", back_populates="users", cascade="all, delete-orphan")


  @property
  def password(self):
    return self.hashed_password


  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)


  def check_password(self, password):
    return check_password_hash(self.password, password)


  def to_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "email": self.email,
      "profile_image_url":self.profile_image_url,
      "bio":self.bio,
      "street_address":self.street_address,
      "city":self.city,
      "state":self.state,
      "zipcode":self.zipcode,
      "created_at": self.created_at,
      "udpated_at": self.updated_at
    }
