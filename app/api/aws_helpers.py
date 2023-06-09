import boto3
import botocore
import os
import uuid
ALLOWED_IMAGE_EXTENSIONS = {"pdf", "png", "jpg", "jpeg", "gif"}
ALLOWED_VIDEO_EXTENSIONS = {"mp4"}

s3 = boto3.client(
   "s3",
   aws_access_key_id=os.environ.get("S3_KEY"),
   aws_secret_access_key=os.environ.get("S3_SECRET")
)

def allowed_img_file(filename):
    return "." in filename and \
           filename.rsplit(".", 1)[1].lower() in ALLOWED_IMAGE_EXTENSIONS

def allowed_vid_file(filename):
    return "." in filename and \
           filename.rsplit(".", 1)[1].lower() in ALLOWED_VIDEO_EXTENSIONS

def get_unique_filename(filename):
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"


def upload_mp4_to_s3(file, acl="public-read"):
    try:
        s3.upload_fileobj(
            file,
            "S3_BUCKET_VIDS",
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )
    except Exception as e:
        # in case the our s3 upload fails
        return {"errors": str(e)}

    return {"url": f"http://S3_BUCKET_VIDS.s3.amazonaws.com/{file.filename}"}

def upload_image_to_s3(file, acl="public-read"):
    try:
        s3.upload_fileobj(
            file,
            "S3_BUCKET_IMGS",
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )
    except Exception as e:
        # in case the our s3 upload fails
        return {"errors": str(e)}

    return {"url": f"http://S3_BUCKET_IMGS.s3.amazonaws.com/{file.filename}"}

def remove_mp4_from_s3(mp4_url):
    # AWS needs the image file name, not the URL,
    # so we split that out of the URL
    key = mp4_url.rsplit("/", 1)[1]
    print(key)
    try:
        s3.delete_object(
        Bucket='S3_BUCKET_VIDS',
        Key=key
        )
    except Exception as e:
        return { "errors": str(e) }
    return True

def remove_image_from_s3(image_url):
    # AWS needs the image file name, not the URL,
    # so we split that out of the URL
    key = image_url.rsplit("/", 1)[1]
    print(key)
    try:
        s3.delete_object(
        Bucket='S3_BUCKET_IMGS',
        Key=key
        )
    except Exception as e:
        return { "errors": str(e) }
    return True
