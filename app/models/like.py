from .db import db
import enum

class Like (db.Model):
    __tablename__ = "likes"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    liked_id = db.Column(db.Integer, nullable=False)
    likeable_type = db.Column(db.Enum('review', 'product', name="likeable_types"), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now())

    # Associations
    users = db.relationship("User", back_populates="likes")

    def to_dict(self):
        return {
            "id":self.id,
            "user_id":self.user_id,
            "liked_id":self.liked_id,
            "likeable_type":self.likeable_type,
            "created_at":self.created_at,
            "updated_at":self.updated_at
        }
