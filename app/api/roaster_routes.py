from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Roaster
from datetime import datetime

roaster_routes = Blueprint("roaster", __name__)

# ****************************** Create, Update, Delete Roaster ********************************

@roaster_routes.route("/", methods=["POST","PATCH","DELETE"])
@login_required
def create_roaster():

    # check if user already has a roaster
    # user = current_user.to_dict()
    # print(user)
    name = request.form.get('name')

    checking_id = Roaster.query.filter(
        Roaster.user_id == current_user.id).first()

    roaster = Roaster.query.filter(Roaster.name == name).first()

    if request.method == "DELETE":
        db.session.delete(checking_id)
        db.session.commit()
        return {"message": "Roaster Account Removed"}, 200

    if request.method == "PATCH":
        
        if roaster is not None:
            return {"error": "This name is taken"}, 409
        
        checking_id.name = name
        checking_id.updated_at = datetime.now()
        db.session.add(checking_id)
        db.session.commit()

        return checking_id.to_dict(), 200

    
    if request.method == "POST":
        if checking_id is None:
            
            checking_name = Roaster.query.filter(Roaster.name == name).first()

            if checking_name is not None:
                return {"error": "This name is taken"}, 409
            # create a new roaster
            roaster = Roaster(
                name=name,
                user_id=current_user.id
            )
            db.session.add(roaster)
            db.session.commit()
            return roaster.to_dict(), 201
        
        return {"error": "You already have a roaster"}, 409

# ****************************** Get Roaster: Name *****************************

@roaster_routes.route("/<string:name>")
def get_roaster_by_name(name):

    roaster = Roaster.query.filter(Roaster.name == name).first()

    if roaster is None:
        # Send error message
        return {"error": "no roaster exists"}, 404
    
    return roaster.to_dict()

# ****************************** Get Roaster: user_id **************************

@roaster_routes.route("/<int:user_id>")
@login_required
def get_roaster_by_id(user_id):

    roaster = Roaster.query.filter(Roaster.user_id == user_id).first()

    if roaster is None:
        # Send error message
        return {"error": "no roaster exists"}, 404
    
    return roaster.to_dict()
