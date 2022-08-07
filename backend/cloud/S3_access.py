import csv
import boto3
from cloud.config import AWS_S3_ACCESS
from io import StringIO
import pandas as pd


def get_s3_url(df):
    try:
        s3 = boto3.client('s3',
            aws_access_key_id=AWS_S3_ACCESS['AWS_ACCESS_KEY_ID'],
            aws_secret_access_key=AWS_S3_ACCESS['AWS_SECRET_ACCESS_KEY']
        )
        csv_buffer = StringIO()
        df.to_csv(csv_buffer)
        s3_object_name = 'admin_data_{:%S%M%H%d%m%Y}.csv'.format(pd.Timestamp.now())
        bucket_name = 'mongomagicdata'
        s3.put_object(Bucket=bucket_name, Key=s3_object_name, Body=csv_buffer.getvalue())
        url = s3.generate_presigned_url('get_object', Params={'Bucket': bucket_name, 'Key': s3_object_name})
        return url
    except:
        return "Error"