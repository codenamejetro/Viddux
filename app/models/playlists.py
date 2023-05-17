from .db import db, environment, SCHEMA, add_prefix_for_prod
from join_tables import playlist_videos

class Playlist(db.Model):

    __tablename__ = 'playlists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    public = db.Column(db.Boolean, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    # song_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('songs.id')), nullable = False)
    description = db.Column(db.String(255))

    created_at = db.Column(db.Date, nullable=False)
    updated_at = db.Column(db.Date, nullable=False)


    user = db.relationship('User', back_populates='playlists')
    songs = db.relationship(
        'Video', secondary=playlist_videos, back_populates='playlists')
