#!/bin/sh
git config --global user.email "github-actions[bot]@users.noreply.github.com"
git config --global user.name "github-actions[bot]"

# ensures origin is authed and force on master branch
git remote set-url origin https://${BWBOT_BRANDWATCHLTD_GITHUB_TOKEN}@github.com/vizia/flags.git
git checkout master

npx standard-version

npm publish

git push origin master && git push origin master --tags
