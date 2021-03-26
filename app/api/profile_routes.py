from flask import Blueprint, session, request
from flask_login import login_required, current_user
from app.models import db, User, Review, Roaster
from app.forms import ProfileForm, check_file
from datetime import datetime

# importing packages for AWS
import boto3
import botocore
from app.config import Config
from app.aws_s3 import upload_file_to_s3
from .auth_routes import validation_errors_to_error_messages


profile_routes = Blueprint("profile", __name__)

# ****************************** Update Profile ********************************

# UPDATE PROFILE FOR LOGGED IN USER
@profile_routes.route("/<int:id>", methods=['PATCH'])
@login_required
def update_profile_pic(id):

    # find user by id
    user = User.query.get(id)
    
    
    # Make form and get csrf_token from request
    form = ProfileForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    # Validate form
    if form.validate_on_submit():
        
        # find user by id
        user = User.query.get(id)

        # add form data to user
        user.bio = request.form.get("bio")
        user.street_address = request.form.get("street_address")
        user.city = request.form.get("city")
        user.state = request.form.get("state")
        user.zipcode = request.form.get("zipcode")
        user.updated_at = datetime.now()

        # checking if file was uploaded
        if len(request.files) > 0:
            file = request.files["file"]
            
            print(file.filename)
            print(type(file))
            if check_file(file.filename):
                file_url = upload_file_to_s3(file, Config.S3_BUCKET)
                user.profile_image_url = file_url
            else:
                return {'errors' : ['Unaccepted file extension, must be JPG, PNG, or JPEG']}, 400
    
        db.session.commit()
        return user.to_dict()
    
    return {'errors' : validation_errors_to_error_messages(form.errors)}, 400

# ****************************** Get Profile ********************************

# GET PROFILE FOR USER
@profile_routes.route("/<int:id>")
def get_profile(id):
    
    user = User.query.filter(User.id == id).first()
    reviews_query = Review.query.filter(Review.user_id == id).all()
    roaster = Roaster.query.filter(Roaster.user_id == id).first()

    reviews = {}
    if user:
        user = user.to_dict()
        if reviews_query:
            for num, r in enumerate(reviews_query, start=1):
                reviews[num] = r.to_dict()
            user.update({"reviews":reviews})
        if roaster is not None:
            user.update({"roaster": "true"})
            user.update({"roaster_id": roaster.id})
        return user
    return {'errors': ["No such user"]}, 404
