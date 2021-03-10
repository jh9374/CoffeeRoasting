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


# UPDATE PROFILE FOR LOGGED IN USER
@profile_routes.route("/<int:id>", methods=['PATCH'])
@login_required
def update_profile(id):
    # Get user from session
    # user = current_user
    # print(user)
    # Prepare form data for validation
    # form = ProfileForm()
    
    # form['csrf_token'].data = request.cookies['csrf_token']
    print("form**********",request.form)
    print("file*********", request.files)
    # {bio} = request.form
    # print(bio)
    # find user by id
    user = User.query.get(id)
    print("-------------",user.to_dict())
    # check form validity and return errors if not valid
    
    
    # add form data to user
    user.bio = request.form.get("bio")
    user.street_address = request.form.get("street_address")
    user.city = request.form.get("city")
    user.state = request.form.get("state")
    user.zipcode = request.form.get("zipcode")

    # checking if file was uploaded
    file = request.files["file"]
    print("FILE", file)
    if file:
        file_url = upload_file_to_s3(file, Config.S3_BUCKET)
        print("file_url",file_url)
        user.profile_image_url = file_url
   
    db.session.commit()
    return user.to_dict()