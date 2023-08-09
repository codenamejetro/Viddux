from .db import db, environment, SCHEMA, add_prefix_for_prod
from .join_tables import playlist_videos

class Playlist(db.Model):
    __tablename__ = 'playlists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    public = db.Column(db.Boolean, nullable=False)
    description = db.Column(db.String(255))

    created_at = db.Column(db.Date, nullable=False)
    updated_at = db.Column(db.Date, nullable=False)


    user = db.relationship('User', back_populates='playlists')
    videos = db.relationship(
        'Video', secondary=playlist_videos, back_populates='playlists')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'public': self.public,
            'description': self.description,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "user": {
                "username": self.user.username,
                "id": self.user.id
            },
            "song": [song.to_dict() for song in self.song]
        }
