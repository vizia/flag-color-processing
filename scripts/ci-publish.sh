#!/bin/sh
git config --global user.email "estocker+gitbot@brandwatch.com"
git config --global user.name "Vizia CI Bot"

npx standard-version

npm publish

git remote add auth-remote https://${GH_TOKEN}@github.com/vizia/flags.git
git push auth-remote master && git push auth-remote master --tags
