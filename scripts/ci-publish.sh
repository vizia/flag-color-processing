#!/bin/sh
git config --global user.email "estocker+gitbot@brandwatch.com"
git config --global user.name "Vizia CI Bot"
git config --global user.password ${GH_TOKEN}

npx standard-version

npm publish

git push origin master && git push origin master --tags
