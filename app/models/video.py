from .db import db, environment, SCHEMA, add_prefix_for_prod
from .join_tables import playlist_videos

class Video(db.Model):
    __tablename__ = 'videos'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String(100), nullable=False, unique=True)
    mp4 = db.Column(db.String(255), nullable=False)
    description = description = db.Column(db.String(255))
    created_at = db.Column(db.Date, nullable=False)
    updated_at = db.Column(db.Date, nullable=False)

    user = db.relationship('User', back_populates='videos')
    playlists = db.relationship(
        'Playlist', secondary=playlist_videos, back_populates='videos', cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'mp4': self.mp4,
            'preview_img': self.preview_img,
            'description': self.description,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
