#!/bin/sh
git config --global user.email "estocker+gitbot@brandwatch.com"
git config --global user.name "Vizia CI Bot"

npx standard-version

npm publish

git remote add origin https://${GH_TOKEN}@github.com:vizia/flags.git
git push origin master && git push origin master --tags
