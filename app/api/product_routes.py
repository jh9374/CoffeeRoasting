from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Product, Roaster
from app.forms import ProductForm
from datetime import datetime
import json

from .auth_routes import validation_errors_to_error_messages

product_routes = Blueprint("product", __name__)

# ****************************** Create Product ********************************

@product_routes.route("", methods=["POST"])
@login_required
def create_product():

    user = current_user

    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    flavours = []
    for x in range(5):
        if request.form.get(f"flavour-{x}"):
            el = request.form.get(f"flavour-{x}")
            flavours.append(el)
    
    # find roaster id
    roaster = Roaster.query.filter(Roaster.user_id == user.id).first()

    if form.validate_on_submit():
        product = Product(
            name=form.data["name"],
            roaster_id=roaster.id,
            price=form.data["price"],
            description=form.data["description"],
            sweetness=form.data["sweetness"],
            acidity=form.data["acidity"],
            mouthfeel=form.data["mouthfeel"],
            flavour=flavours
        )
        print(product.flavour)
        db.session.add(product)
        db.session.commit()
        return product.to_dict(), 201
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400

# ****************************** Get, Update, Delete Product *******************

@product_routes.route("/<int:id>", methods=["GET", "PATCH", "DELETE"])
@login_required
def handle_product(id):

    product = Product.query.filter(Product.id == id).first()

    if product is None:
        return {"error": "product does not exist"}, 404

    if request.method == "GET":
        return product.to_dict()

    if request.method == "PATCH":

        form = ProductForm()
        form['csrf_token'].data = request.cookies['csrf_token']

        flavours = []
        for x in range(5):
            if request.form.get(f"flavour-{x}"):
                el = request.form.get(f"flavour-{x}")
                flavours.append(el)

        if form.validate_on_submit():
            product.name=form.data["name"],
            product.price=form.data["price"],
            product.description=form.data["description"],
            product.sweetness=form.data["sweetness"],
            product.acidity=form.data["acidity"],
            product.mouthfeel=form.data["mouthfeel"],
            product.flavour.clear(),
            product.flavour=flavours,
            product.updated_at=datetime.now()
            
            db.session.add(product)
            db.session.commit()
            return product.to_dict(), 201

    if request.method == "DELETE":
        db.session.delete(product)
        db.session.commit()
        return {"message":"Product Deleted"}, 200 
    return {"message":"Product created"}, 200

# ****************************** Get All Products **********************************

@product_routes.route("")
def get_products():

    query_results = Product.query.all()
    products = {}
    for num, prod in enumerate(query_results, start=1):
        products[num] = prod.to_dict()
    return products, 200
