from .db import db, environment, SCHEMA, add_prefix_for_prod
from join_tables import playlist_videos

class Video(db.Model, UserMixin):
    __tablename__ = 'videos'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), nullable=False))
    name = db.Column(db.String(100), nullable=False, unique=True)


    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    preview_img = db.Column(db.String(255),
                            # default=
                            )

    user = db.relationship('User', back_populates='videos')
    playlists = db.relationship(
        'Playlist', secondary=playlist_videos, back_populates='songs', cascade='all, delete')
