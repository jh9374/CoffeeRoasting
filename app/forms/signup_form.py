from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, EqualTo, InputRequired
from app.models import User


def user_exists(form, field):
    print("Checking if user exits", field.data)
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("Email is already registered, please go to login page.")

def username_exists(form, field):
    print("Checking if username exits", field.data)
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError("This username is not available, please choose a different one.")


class SignUpForm(FlaskForm):
    username = StringField('username', validators=[ InputRequired(), DataRequired(), username_exists])
    email = StringField('email', validators=[ InputRequired(), DataRequired(),Email("Email is not valid."), user_exists])
    password = StringField('password', validators=[ InputRequired(), DataRequired(), EqualTo("confirm", "Password entries do not match.")])
    confirm = StringField('password', validators=[ InputRequired(), DataRequired()])
