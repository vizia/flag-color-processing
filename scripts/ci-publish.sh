#!/bin/sh
git config --global user.email "estocker+gitbot@brandwatch.com"
git config --global user.name "Vizia CI Bot"

# ensures origin is authed and force on master branch
git remote set-url origin https://${GH_TOKEN}@github.com/vizia/flags.git
git checkout master

npx standard-version

npm publish

git push origin master && git push origin master --tags
