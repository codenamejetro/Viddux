from flask_sqlalchemy import SQLAlchemy
from .db import add_prefix_for_prod, environment, SCHEMA
from .db import db

playlist_videos = db.Table('playlist_videos',
                            db.Model.metadata,
    db.Column('playlist_id', db.Integer, db.ForeignKey(add_prefix_for_prod('playlists.id')), primary_key=True),
    db.Column('video_id', db.Integer, db.ForeignKey(add_prefix_for_prod('videos.id')), primary_key=True)
)

if environment == 'production':
    playlist_songs.schema = SCHEMA
