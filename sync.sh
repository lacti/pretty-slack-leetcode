#!/bin/bash

set -euxo pipefail

if [ -z "${BUCKET_NAME}" ]; then
  echo "Please set env first"
  exit 1
fi

if [ -z "$(which mkdocs)" ]; then
  echo "Please install mkdocs first"
  exit 1
fi

if [ $# -eq 0 ]; then
  echo "$0 username..."
  exit 0
fi

for USER_NAME in "$@"; do
  echo "Run with target [${USER_NAME}]"
  yarn start "${USER_NAME}" && yarn build

  URL_PREFIX="${URL_PREFIX:-"/"}"
  URL_USER_NAME="${USER_NAME,,}"
  URL_USER_NAME="$(echo "${URL_USER_NAME}" | tr " " ".")"
  echo "Upload to ${BUCKET_NAME}${URL_PREFIX}/${URL_USER_NAME}"

  aws s3 sync --delete site "s3://${BUCKET_NAME}${URL_PREFIX}/${URL_USER_NAME}"

  echo "All done: https://${SUB_DOMAIN}.${DOMAIN}${URL_PREFIX}/${URL_USER_NAME}"
done

if [ ! -z "${DISTRIBUTION_ID}" ]; then
  aws cloudfront create-invalidation --distribution-id "${DISTRIBUTION_ID}" --paths "${URL_PREFIX}/*"
fi
