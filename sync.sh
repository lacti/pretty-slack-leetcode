#!/bin/bash

set -euxo pipefail

USER_NAME="${1:-""}"
if [ -z "${USER_NAME}" ]; then
  echo "$0 username"
  exit 0
fi

if [ -z "${BUCKET_NAME}" ]; then
  echo "Please set env first"
  exit 1
fi

if [ -z "$(which mkdocs)" ]; then
  echo "Please install mkdocs first"
  exit 1
fi

echo "Run with target [${USER_NAME}]"

URL_PREFIX="${URL_PREFIX:-"/"}"
echo "Upload to ${BUCKET_NAME}${URL_PREFIX}/${USER_NAME}"

yarn start "${USER_NAME}"
mkdocs build
aws s3 sync site "s3://${BUCKET_NAME}${URL_PREFIX}/${USER_NAME}"

if [ ! -z "${DISTRIBUTION_ID}" ]; then
  aws cloudfront create-invalidation --distribution-id "${DISTRIBUTION_ID}" --paths "${URL_PREFIX}/${USER_NAME}/*"
fi

echo "All done: https://${SUB_DOMAIN}.${DOMAIN}${URL_PREFIX}/${USER_NAME}"

