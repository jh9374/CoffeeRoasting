from flask_wtf import FlaskForm
from wtforms import StringField, FieldList, IntegerField, TextAreaField
from wtforms.validators import DataRequired, ValidationError, InputRequired

class ProductForm(FlaskForm):
    name = StringField('name', validators=[ DataRequired(message='name is required')])
    price = IntegerField('price', validators=[ DataRequired(message='price is required')])
    description = TextAreaField('description', validators=[ DataRequired(message='description is required')])
    sweetness = IntegerField('sweetness', validators=[ DataRequired(message='sweetness is required')])
    acidity = IntegerField('acidity', validators=[ DataRequired(message='acidity is required')])
    mouthfeel = IntegerField('mouthfeel', validators=[ DataRequired(message='mouthfeel is required')])
    flavour = FieldList(StringField('flavour', validators=[DataRequired(message='flavour is required')]), min_entries=2, max_entries=3)
