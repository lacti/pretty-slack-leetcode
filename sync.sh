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

echo "Run with target [${TARGET}]"
echo "Upload to ${BUCKET_NAME}${URL_PREFIX}"

yarn start "${TARGET}"
mkdocs build
aws s3 sync site "s3://${BUCKET_NAME}${URL_PREFIX}"

if [ ! -z "${DISTRIBUTION_ID}" ]; then
  aws cloudfront create-invalidation --distribution-id "${DISTRIBUTION_ID}" --paths "${URL_PREFIX}/*"
fi

