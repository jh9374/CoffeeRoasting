from .db import db

class Review(db.Model):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    content = db.Column(db.Text, nullable=False)
    roast_rating = db.Column(db.Integer, nullable=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now())

    # Associations
    products = db.relationship(
        "Product", back_populates="reviews")
    users = db.relationship(
        "User", back_populates="reviews")

    def to_dict(self):
        return {
            "id":self.id,
            "product_id":self.product_id,
            "user_id":self.user_id,
            "content":self.content,
            "roast_rating":self.roast_rating,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
