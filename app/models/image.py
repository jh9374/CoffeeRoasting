from .db import db
import enum

class Image(db.Model):
    __tablename__ = "images"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    type_id = db.Column(db.Integer, nullable=False)
    type = db.Column(db.Enum('review', 'roaster', 'product', name="image_types"), nullable=False)
    image_url = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now())

    # associations
    users = db.relationship("User", back_populates="images")

    def to_dict(self):
        return {
            "id":self.id,
            "user_id":self.user_id,
            "type_id":self.type_id,
            "type":self.type,
            "image_url":self.image_url,
            "created_at":self.created_at,
            "updated_at":self.updated_at
        }
