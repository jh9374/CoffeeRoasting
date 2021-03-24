from .db import db
# from .order_item import order_items


class Order(db.Model):
    __tablename__ = "orders"

    id = db.Column(db.Integer, primary_key=True)
    order_status = db.Column(db.String, nullable=False)
    purchaser_id = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now())

    # associations
    users = db.relationship("User", back_populates="orders")
    # products = db.relationship(
    #     "Product", secondary=order_items, back_populates="orders")
    products = db.relationship("Order_Item", lazy='joined',
                               back_populates="orders", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "order_status": self.order_status,
            "purchaser_id": self.purchaser_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
