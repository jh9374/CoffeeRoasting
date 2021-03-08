from .db import db

class Order_Item(db.Model):
    __tablename__ = "order_items"

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey("orders.id"),nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"),nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now())

    # Associations
    orders = db.relationship("Order", back_populates="products")
    products = db.relationship("Product", back_populates="orders")

    def to_dict(self):
        return {
            "id":self.id,
            "order_id" : self.order_id,
            "product_id" : self.product_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

# order_items = Table('association', Base.metadata,
#             Column(db.Integer, nullable=False, db.ForeignKey("order.id"),
#             Column(db.Integer, nullable=False, db.ForeignKey("product.id")
