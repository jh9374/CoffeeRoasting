from .db import db

class Roaster(db.Model):
    __tablename__ = "roasters"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False, unique=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now())

    # Associations
    users = db.relationship("User", back_populates="roasters")
    products = db.relationship("Product", back_populates="roasters", cascade="all, delete-orphan")
    locations = db.relationship("Location", back_populates="roasters", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id":self.id,
            "name":self.name,
            "user_id":self.user_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
