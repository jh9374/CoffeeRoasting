from .db import db

class Product(db.Model):
    __tablename__ = "products"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(40), nullable = False)
    roaster_id = db.Column(db.Integer, db.ForeignKey("roasters.id"), nullable=False)
    price = db.Column(db.Integer, nullable = False)
    description = db.Column(db.Text, nullable = False)
    sweetness = db.Column(db.Integer, nullable = False)
    acidity = db.Column(db.Integer, nullable = False)
    mouthfeel = db.Column(db.Integer, nullable = False)
    flavour = db.Column(db.ARRAY(db.String), nullable = False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now())

    # Associations
    roasters = db.relationship("Roaster", back_populates="products")
    orders = db.relationship(
        "Order_Item", back_populates="products")
    reviews = db.relationship(
        "Review", back_populates="products", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id":self.id,
            "name":self.name,
            "roaster_id":self.roaster_id,
            "price":self.price,
            "description":self.description,
            "sweetness":self.sweetness,
            "acidity":self.acidity,
            "mouthfeel":self.mouthfeel,
            "flavour":self.flavour,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
