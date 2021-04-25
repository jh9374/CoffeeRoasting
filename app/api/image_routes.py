from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Image
from app.forms import check_file
from datetime import datetime
import boto3
import botocore
from app.config import Config
from app.aws_s3 import upload_file_to_s3

image_routes = Blueprint("image", __name__)

@image_routes.route("/images", methods=["POST"])
@login_required
def upload_images():

    images = {}
    idx = 0
    if len(request.files) > 0:
        file_list = request.files.getlist('images')
        for file in file_list:
            if not check_file(file.filename):
                return {'errors': ['Unaccepted file extension, must be JPG, PNG, or JPEG']}, 400
        for file in file_list:
            image = Image()
            image.user_id=current_user.id
            image.type_id=request.form.get("type_id")
            image.type=request.form.get("type")
            file_url = upload_file_to_s3(file, Config.S3_BUCKET)
            image.image_url = file_url
            db.session.add(image)
            db.session.commit()
            images[idx] = image.to_dict()
            idx += 1
            
        return images, 201
    else:
        return {"errors":"no files"}, 400
    

@image_routes.route("/images/<int:id>", methods=["DELETE"])
@login_required
def delete_image(id):

    image = Image.query.filter(Image.id == id).first()

    if image is not None:
        db.session.delete(image)
        db.session.commit()
        return {"message":"Image Deleted"}
    return {"error": "Image does not exist"}, 404

@image_routes.route("/products/<int:id>/images")
def get_product_images(id):

    query_results = Image.query.filter(
        Image.type == 'product',
        Image.type_id == id).all()
    images = {}
    for num, image in enumerate(query_results, start=1):
        images[num] = image.to_dict()
    return images, 200

@image_routes.route("/reviews/<int:id>/images")
def get_review_images(id):

    query_results = Image.query.filter(
        Image.type == 'review',
        Image.type_id == id).all()
    images = {}
    for num, image in enumerate(query_results, start=1):
        images[num] = image.to_dict()
    return images, 200

@image_routes.route("/roasters/<int:id>/images")
def get_roaster_images(id):

    query_results = Image.query.filter(
        Image.type == 'roaster',
        Image.type_id == id).all()
    images = {}
    for num, image in enumerate(query_results, start=1):
        images[num] = image.to_dict()
    return images, 200

@image_routes.route("/images")
def get_images():

    query_results = Image.query.all()
    images = {}
    for image in query_results:
        images[image.id] = image.to_dict()
    return images, 200
