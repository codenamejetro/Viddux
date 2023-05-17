from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from sqlalchemy import desc, asc, func
from app.models import Video, User
# from app.forms import VideoForm
from datetime import date
from app.models import db
from flask import redirect, request
# from .user_routes import user
# from app.aws import (
#     upload_file_to_s3, get_unique_filename, remove_file_from_s3
# )

videos_routes = Blueprint('videos', __name__, url_prefix="/api/videos")

# Get all videos
@videos_routes.route('/')
def get_all_videos():
    videos = Video.query.order_by(desc(Video.created_at)).all()
    res = []
    for video in videos:
        video = video.to_dict()
        res.append(video)

    return {"videos": [video for video in res]}


# Get a video by id
@videos_routes.route('/<int:id>')
def get_video(id):
    video = Video.query.get(id)
    creator = User.query.get(video.user_id)
    video = video.to_dict()
    creator = creator.to_dict()
    print('VIDEOOOOOOOOOOOOOOOOOOOOO', creator)
    video['creator'] = creator
    # print('video in videos routes', video)

    return video


# Post a video
# @videos_routes.route('/new', methods=['POST'])
# def post_videos():
#     form = VideoForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         if "mp3_file" not in request.files:
#             return {"errors": "video file required"}, 400
#         image = request.files["mp3_file"]
#         image.filename = get_unique_filename(image.filename)
#         upload = upload_file_to_s3(image)

#         if "url" not in upload:
#             # print("UPLOAD[ERRORS]", upload['errors'])
#         # if the dictionary doesn't have a url key
#         # it means that there was an error when we tried to upload
#         # so we send back that error message
#             # return render_template("post_form.html", form=form, errors=[upload])
#             return upload, 400
#         url = upload["url"]

#         # preview_img_file = request.files["preview_img"]
#         # preview_img_file.filename = get_unique_filename(
#         #     preview_img_file.filename)
#         # preview_img_upload = upload_file_to_s3(preview_img_file)

#         # if "url" not in preview_img_upload:
#         #     return preview_img_upload, 400

#         # preview_img_url = preview_img_upload["url"]

#         new_video = Video(
#             name=form.data['name'],
#             artist_name=form.data['artist_name'],
#             mp3_file=url,
#             genre=form.data['genre'],
#             artist_id=current_user.id,
#             # preview_img=preview_img_url,
#             preview_img='',
#             created_at=date.today(),
#             updated_at=date.today()
#         )

#         db.session.add(new_video)
#         db.session.commit()
#         return new_video.to_dict()

#     return {"errors": form.errors}


# Update a video
# @videos_routes.route('/<int:id>', methods=["PUT"])
# def update_video(id):
#     form = VideoForm()
#     form['csrf_token'].data = request.cookies['csrf_token']

#     if form.validate_on_submit():
#         if "mp3_file" not in request.files:
#             return {"errors": "video file required"}, 400
#         image = request.files["mp3_file"]
#         print(image)
#         image.filename = get_unique_filename(image.filename)
#         upload = upload_file_to_s3(image)
#         # print(request.files['name'])
#         if "url" not in upload:
#             print(upload['errors'])
#         # if the dictionary doesn't have a url key
#         # it means that there was an error when we tried to upload
#         # so we send back that error message
#             # return render_template("post_form.html", form=form, errors=[upload])
#             return upload, 400
#         url = upload["url"]

#         video = Video.query.get(id)

#         if not video:
#             return {"errors": "video doesn't exist"}

#         elif video.artist_id != current_user.id:
#             return {"errors": "nacho video"}

#         if video.mp3_file:
#             remove_file_from_s3(video.mp3_file)

#         video.name = form.data['name']
#         video.artist_name = form.data['artist_name']
#         video.mp3_file = url
#         video.genre = form.data['genre']
#         video.preview_img = form.data['preview_img']
#         video.artist_id = current_user.id
#         video.updated_at = date.today()

#         db.session.commit()

#         return video.to_dict()

#     return {"errors": form.errors}


# Delete a video
# @videos_routes.route('/<int:id>', methods=['DELETE'])
# def delete_video(id):
#     video = Video.query.get(id)
#     print(video)
#     if video.artist_id != current_user.id:
#         return {"errors": 'nacho video'}

#     if video.mp3_file:
#         remove_file_from_s3(video.mp3_file)

#     db.session.delete(video)
#     db.session.commit()
#     return {'success': 'good job'}
