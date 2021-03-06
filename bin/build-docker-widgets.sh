#!/bin/bash
set -eo pipefail

DATE=$(date +%s)

if [ -n "$CIRCLE_SHA1" ]; then
  echo "Running in Circle CI"
  REV="$CIRCLE_WORKFLOW_ID-$(git rev-parse --verify HEAD)"
else
  echo "Running outside CI"
  REV="$DATE-$(git rev-parse --verify HEAD)"
fi

TAG="eu.gcr.io/moocfi/quizzes-widgets:build-$REV"
echo Building "$TAG"
cd packages/moocfi-quizzes
docker build . -f Dockerfile.widgets -t "$TAG"
cd ../..

echo "Successfully built image: $TAG"
