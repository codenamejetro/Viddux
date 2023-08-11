from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import Playlist

class PlaylistForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    is_public = BooleanField('public')
    description = StringField('description', validators=[DataRequired()])
    # preview_img = FileField("Image File")
