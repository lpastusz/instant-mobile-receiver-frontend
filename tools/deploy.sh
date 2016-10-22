set -a
. .env
set +a

aws s3 sync app/ s3://instant-mobile-receiver-front