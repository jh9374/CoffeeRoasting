from flask_wtf import FlaskForm
from wtforms import StringField, FieldList, IntegerField, TextAreaField
from wtforms.validators import DataRequired, ValidationError, InputRequired, NumberRange


class ReviewForm(FlaskForm):
    content = TextAreaField('content', validators=[
                                DataRequired(message='content is required')])
    roast_rating = IntegerField('roast_rating', validators=[NumberRange(min=0, max=10, message="Rating must be within 0-10")])
