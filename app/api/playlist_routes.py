from flask import Blueprint, jsonify
from app.models import Playlist, User

playlists_routes = Blueprint('playlists', __name__, url_prefix="/api/playlists")


#Get all playlists
@playlists_routes.route('/')
def get_all_playlists():
    playlists = Playlist.query.all()
    return {"playlists": [playlist.to_dict() for playlist in playlists]}

#Get playlist by id


#Get all current user playlists


#Add video to playlist


#Create playlist


#Update playlist


#Delete playlist
