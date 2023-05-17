from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.api.aws_helpers import ALLOWED_IMAGE_EXTENSIONS, ALLOWED_VIDEO_EXTENSIONS
from app.models import Video

class PostVideoForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired(), Length(min=1, max=100)])
    mp4 = FileField("mp4", validators=[FileRequired(), FileAllowed(ALLOWED_VIDEO_EXTENSIONS)])
    preview_img = FileField("preview_img", validators=[FileRequired(), FileAllowed(ALLOWED_IMAGE_EXTENSIONS)])
    description = StringField('description', validators=[DataRequired(), Length(max=255)])
