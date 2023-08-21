from flask import Blueprint, jsonify, redirect, request
from sqlalchemy import delete
from flask_login import login_required, current_user
from app.forms.playlist_form import PlaylistForm
from app.models import Playlist, Video, User, playlist_videos
from app.models import db

from datetime import date

playlists_routes = Blueprint('playlists', __name__, url_prefix="/api/playlists")


#Get all playlists
@playlists_routes.route('/')
def get_all_playlists():
    playlists = Playlist.query.all()
    return {"playlists": [playlist.to_dict() for playlist in playlists]}


#Get playlist by id
@playlists_routes.route('/<int:id>')
def get_playlist(id):
    playlist = Playlist.query.get(id)
    if playlist:
        return playlist.to_dict()
    else:
        return {"errors": "Playlist not found"}


#Get all current user playlists
@playlists_routes.route('/current')
@login_required
def get_current_user_playlists():
    playlists = Playlist.query.filter_by(user_id=current_user.id).all()
    # print('user', playlists)
    return {"playlists": [playlist.to_dict() for playlist in playlists]}


#Create playlist
@playlists_routes.route('/new', methods=['POST'])
def create_playlist():
    form = PlaylistForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data)
    if form.validate_on_submit():
        # preview_img_file = request.files["preview_img"]
        # preview_img_file.filename = get_unique_filename(
        #     preview_img_file.filename)
        # preview_img_upload = upload_file_to_s3(preview_img_file)

        # if "url" not in preview_img_upload:
        #     return preview_img_upload, 400

        # preview_img_url = preview_img_upload["url"]

        new_playlist = Playlist(
            name=form.data['name'],
            public=form.data['is_public'],
            description=form.data['description'],
            user_id=current_user.id,
            # preview_img=preview_img_url,
            created_at=date.today(),
            updated_at=date.today()
        )
        db.session.add(new_playlist)
        db.session.commit()
        return new_playlist.to_dict()
    return {"errors": form.errors}


#Add video to playlist
@playlists_routes.route('/<int:playlist_id>/videos/<int:video_id>', methods=['POST'])
def add_video_to_playlist(playlist_id, video_id):
    playlist = Playlist.query.get(playlist_id)
    video = Video.query.get(video_id)

    if not playlist or not video:
        return {"error": "Playlist or Video not found"}, 404

    # Add the video to the playlist
    ins = playlist_videos.insert().values(
        playlist_id=playlist_id, video_id=video_id)
    db.session.execute(ins)
    db.session.commit()

    return {"success": "Video added to the playlist"}



#Update playlist
@playlists_routes.route('/<int:id>', methods=["PUT"])
def update_playlist(id):
    form = PlaylistForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        playlist = Playlist.query.get(id)

        if not playlist:
            return {"errors": "playlist doesn't exist"}

        elif playlist.user_id != current_user.id:
            return {"errors": "not your playlist"}

        playlist.name = form.data['name']
        playlist.is_public = form.data['is_public']
        playlist.description = form.data['description']
        playlist.user_id = current_user.id
        # if 'preview_img' in form.data:
        #     playlist.preview_img = form.data['preview_img']
        # else:
        #     playlist.preview_img = None
        # playlist.preview_img = form.data['preview_img']
        playlist.updated_at = date.today()

        db.session.add(playlist)
        db.session.commit()

        return playlist.to_dict()

    return {"errors": form.errors}


#Remove video from playlist
@playlists_routes.route('/<int:playlist_id>/videos/<int:video_id>', methods=['DELETE'])
def remove_video_from_playlist(playlist_id, video_id):
    playlist = Playlist.query.get(playlist_id)
    video = Video.query.get(video_id)
    # playlist_vids = playlist

    # the_row = db.session.query(playlist_videos).filter(playlist_id == playlist_id)
    # print('THE_ROW', the_row)
    if not playlist or not video:
        return {"error": "Playlist or Video not found"}, 404

    # Remove the video from the playlist
    dele = delete(playlist_videos).where(playlist_videos.c.video_id == video_id)

    db.session.execute(dele)
    db.session.commit()

    return {"success": "Video removed from playlist"}

#Delete playlist
@playlists_routes.route('/<int:id>', methods=['DELETE'])
def delete_playlist(id):
    playlist = Playlist.query.get(id)
    # print(playlist)
    if playlist.user_id != current_user.id:
        return {"errors": 'nacho playlist'}
    else:
        db.session.delete(playlist)
        db.session.commit()
        return {'success': 'good job'}
