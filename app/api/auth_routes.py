from flask import Blueprint, jsonify, session, request
from app.models import User, db, Roaster
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)

# ****************************** Validation Errors List ************************

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{error}")
    return errorMessages

# ****************************** Authentication ********************************

@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        roaster = Roaster.query.filter(Roaster.user_id == current_user.id).first()
        user = current_user.to_dict()
        if roaster is not None:
            user.update({"roaster": "true"})
            return user, 200
        else:
            user.update({"roaster": "false"})
            return user, 200
    return {'errors': ['Unauthorized']}, 401

# ****************************** Login *****************************************

@auth_routes.route('/login', methods=['POST'])
def login():

    form = LoginForm()

    # Get the csrf_token from the request cookie and put it into the
    form['csrf_token'].data = request.cookies['csrf_token']

    # Validate Form
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        # Check if user has a Roastery
        roaster = Roaster.query.filter(Roaster.user_id == user.id).first()
        user = user.to_dict()
        if roaster is not None:
            user.update({"roaster": "true"})
            return user, 200
        else:
            user.update({"roaster": "false"})
            return user, 200
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# ****************************** Logout ****************************************

@auth_routes.route('/logout')
def logout():
    
    logout_user()

    return {'message': 'User logged out'}, 200

# ****************************** Sign Up / Create User ***********************************

@auth_routes.route('/signup', methods=['POST'])
def sign_up():

    form = SignUpForm()

    # Get the csrf_token from the request cookie and put it into the
    form['csrf_token'].data = request.cookies['csrf_token']

    # Validate Form
    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password'],
            bio="I LOVE COFFEE"
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        user = user.to_dict()
        user.update({"roaster": "false"})
        return user, 201
    return {'errors': validation_errors_to_error_messages(form.errors)}, 409

# ****************************** Delete User ****************************************

@auth_routes.route('/', methods=['DELETE'])
def delete_user():

    user = current_user
    
    db.session.delete(user)
    db.session.commit()

    return {'message': 'User Account Removed'}, 200

# ****************************** Unauthorized **********************************

@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
