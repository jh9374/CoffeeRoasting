from flask import Blueprint, session, request
from flask_login import login_required, current_user
from app.models import db, User
from app.forms import ProfileForm

# importing packages for AWS
import boto3
import botocore
from app.config import Config
from app.aws_s3 import upload_file_to_s3


profile_routes = Blueprint("profile", __name__)


# UPDATE PROFILE PIC FOR LOGGED IN USER
@profile_routes.route("/<int:id>", methods=['PATCH'])
@login_required
def update_profile_pic(id):

    # find user by id
    user = User.query.get(id)
    
    # add form data to user
    user.bio = request.form.get("bio")
    user.street_address = request.form.get("street_address")
    user.city = request.form.get("city")
    user.state = request.form.get("state")
    user.zipcode = request.form.get("zipcode")

    # checking if file was uploaded
    
    if len(request.files) > 0:
        file = request.files["file"]
        print(file.filename)
        print(type(file))
        file_url = upload_file_to_s3(file, Config.S3_BUCKET)
        user.profile_image_url = file_url
   
    db.session.commit()
    return user.to_dict()

# UPDATE PROFILE FOR LOGGED IN USER
@profile_routes.route("/<username>")
@login_required
def get_profile(username):
    # Get user from session
    
    # form['csrf_token'].data = request.cookies['csrf_token']
    # {bio} = request.form
    # find user by id
    
    user = User.query.filter(User.username == username).first()
    # check form validity and return errors if not valid
    if user:
        return user.to_dict()
    return {'errors': ["No such user"]}, 404
