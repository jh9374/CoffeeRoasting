from .login_form import LoginForm
from .signup_form import SignUpForm
from .profile_form import ProfileForm
from .product_form import ProductForm
from .review_form import ReviewForm

def check_file(file):
    print('Checking for correct file extension to be an image')
    extensions = {'png', 'jpg', 'jpeg'}
    return file.rsplit('.', 1)[1].lower() in extensions