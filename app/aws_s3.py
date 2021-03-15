import boto3
import botocore
import datetime
from .config import Config


s3 = boto3.client(
    "s3",
    aws_access_key_id=Config.S3_KEY,
    aws_secret_access_key=Config.S3_SECRET
)

date = datetime.datetime.now()

def upload_file_to_s3(file, bucket_name, acl="public-read"):
    date = datetime.datetime.now()
    key = date.strftime("%f")
    try:

        s3.upload_fileobj(
            file,
            bucket_name,
            Key=key,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )

    except Exception as e:
        # This is a catch all exception, edit this part to fit your needs.
        print("Something Happened: ", e)
        return e

    return f"{Config.S3_LOCATION}{key}"
