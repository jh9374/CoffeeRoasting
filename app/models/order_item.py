from .db import db

# order_items = db.Table('order_items',
#                        db.Column("order_id", db.Integer, db.ForeignKey("orders.id"), primary_key=True),
#                        db.Column("product_id", db.Integer, db.ForeignKey("products.id"), primary_key=True)
#                        )

class Order_Item(db.Model):
    __tablename__ = "order_items"

    order_id = db.Column(db.Integer, db.ForeignKey("orders.id"), primary_key=True, nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"), primary_key=True, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    # Associations
    orders = db.relationship("Order", back_populates="products")
    products = db.relationship("Product", back_populates="orders")

    def to_dict(self):
        return {
            "order_id" : self.order_id,
            "product_id" : self.product_id,
            "quantity": self.quantity
        }
