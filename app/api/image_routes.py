from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Image
from datetime import datetime

image_routes = Blueprint("image", __name__)

@image_routes.route("/images", methods=["POST"])
@login_required
def upload_images():

    if len(request.files) > 0:
        print("files exist")
    return {"message":"success"}
