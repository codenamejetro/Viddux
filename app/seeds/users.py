from app.models import db, User, Video, Playlist, playlist_videos, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date
from sqlalchemy import insert

# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(username='Demo', email='demo@aa.io', password='password', first_name = 'Demo', last_name = 'Demo', profile_pic ='')
    marnie = User(username='marnie', email='marnie@aa.io', password='password', first_name = 'Mar', last_name = 'Nie', profile_pic ='')
    bobbie = User(username='bobbie', email='bobbie@aa.io', password='password', first_name = 'Bob', last_name = 'Bie', profile_pic ='')
    mazumaro = User(username='mazumaro', email='mazumaro@aa.io', password='password', first_name = 'Mazu', last_name = 'Maro', profile_pic ='')
    hiroyukisawano = User(username='hirosawa', email='hirosawa@aa.io', password='password', first_name = 'Hiroyuki', last_name = 'Sawano', profile_pic= '')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(mazumaro)
    db.session.add(hiroyukisawano)

    db.session.commit()

def seed_videos():
    video1 = Video(user_id=2, title='How to cake', mp4='howtocake.mp4', description='teaches you how to cake', created_at=date.today(), updated_at = date.today())
    video2 = Video(user_id=2, title='How to cake pt2', mp4='howtocakept2.mp4', description='teaches you how to cake pt2', created_at=date.today(), updated_at = date.today())
    video3 = Video(user_id=3, title='How to dance', mp4='howtodance.mp4', description='teaches you how to dance', created_at=date.today(), updated_at = date.today())
    video4 = Video(user_id=4, title='Myth\'s Bad Ending Part 1', mp4='https://www.youtube.com/watch?=euPfAilSpuU&t', description='HoloMyth fan animation', created_at=date.today(), updated_at = date.today())
    video5 = Video(user_id=4, title='Myth\'s Bad Ending Part 2', mp4='https://www.youtube.com/embed/euPfAilSpuU&t', description='HoloMyth fan animation', created_at=date.today(), updated_at = date.today())
    video6 = Video(user_id=5, title='Light and Shadow Production', mp4='Light_and_shadow_prod.mp4', description='Behind the scenes of Riot\'s Light and Shadow', created_at=date.today(), updated_at = date.today())

    db.session.add(video1)
    db.session.add(video2)
    db.session.add(video3)
    db.session.add(video4)
    db.session.add(video5)
    db.session.add(video6)

    db.session.commit()

def seed_playlists():
    playlist1 = Playlist(user_id=1, name='how-tos', public=True, description='how to videos', created_at=date.today(), updated_at = date.today())
    playlist2 = Playlist(user_id=2, name='HoloMyth', public=True, description='everything hololive', created_at=date.today(), updated_at = date.today())
    playlist3 = Playlist(user_id=3, name='Hiroyuki Sawano Fan', public=True, description='Appreciate Hiroyuki Sawano', created_at=date.today(), updated_at = date.today())

    db.session.add(playlist1)
    db.session.add(playlist2)
    db.session.add(playlist3)

    db.session.commit()

def seed_playlist_videos():
    db.session.execute(insert(playlist_videos).values(playlist_id=1, video_id=1))
    db.session.execute(insert(playlist_videos).values(playlist_id=1, video_id=2))
    db.session.execute(insert(playlist_videos).values(playlist_id=1, video_id=3))
    db.session.execute(insert(playlist_videos).values(playlist_id=2, video_id=4))
    db.session.execute(insert(playlist_videos).values(playlist_id=2, video_id=5))
    db.session.execute(insert(playlist_videos).values(playlist_id=3, video_id=6))

    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()

def undo_videos():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.videos RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM videos")

    db.session.commit()

def undo_playlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM playlists")

    db.session.commit()

def undo_playlist_videos():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlist_videos RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM playlist_videos")

    db.session.commit()
