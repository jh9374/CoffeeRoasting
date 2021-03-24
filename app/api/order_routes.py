from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Order, Order_Item, Product
from datetime import datetime

from .auth_routes import validation_errors_to_error_messages

order_routes = Blueprint("order", __name__)

@order_routes.route("/orders", methods=["POST"])
@login_required
def create_order():

    data = request.json

    products = data["products"]

    order = Order(
        order_status = data["order_status"],
        purchaser_id = data["purchaser_id"]
    )

    for product_id in products:
        # creating an order item and setting quantity
        order_item = Order_Item(quantity=products[product_id])
        # acquiring product from product table based on product_id
        product = Product.query.filter(Product.id == product_id).first()
        # adding product to order_item
        order_item.products = product
        # appending product to order via order_item
        order.products.append(order_item)
        db.session.add(order_item)
    db.session.add(order)
    db.session.commit()
        
    return order.to_dict(), 201

@order_routes.route("/orders/<int:id>", methods=["PATCH", "DELETE"])
@login_required
def handle_order(id):
    query_res = Order.query.filter(Order.id == id).first()
    if request.method == "DELETE":
        db.session.delete(query_res)
        db.session.commit()
        return {"message":"Order Deleted"}, 200
    
    return {"message": "patch/delete route"}

@order_routes.route("/orders/<int:id>")
@login_required
def get_order(id):

    query_res = Order.query.filter(Order.id == id).first()
    order = query_res.to_dict()
    items = {}
    for num, order_item in enumerate(query_res.products, start=1):
        print(order_item.products)
        items[num] = order_item.to_dict()
        items[num]["product"] = order_item.products.to_dict() 
    order.update({"order_items":items})
    print(order)
    return order, 200

@order_routes.route("/users/<int:id>/orders")
@login_required
def get_user_orders(id):

    query_results = Order.query.filter(Order.purchaser_id == id).all()
    order = {}
    for num, ord in enumerate(query_results, start=1):
        order[num] = ord.to_dict()
    return order, 200
