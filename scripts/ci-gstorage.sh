#!/bin/sh
curl ci-utils.bwcom.io/gcloud/install | bash
curl ci-utils.bwcom.io/gcloud/auth | bash
gsutil -m cp -r $TRAVIS_BUILD_DIR/public gs://cdn.vizia.brandwatch.com/assets/@vizia-assets/flags
gsutil -m cp -r $TRAVIS_BUILD_DIR/src gs://cdn.vizia.brandwatch.com/assets/@vizia-assets/flags
