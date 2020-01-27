#!/bin/sh
curl ci-utils.bwcom.io/gcloud/install | bash
curl ci-utils.bwcom.io/gcloud/auth | bash
gsutil cp $TRAVIS_BUILD_DIR/public gs://vizia-random-stuff/@vizia-assets/flags/public
gsutil cp $TRAVIS_BUILD_DIR/src gs://vizia-random-stuff/@vizia-assets/flags/src
