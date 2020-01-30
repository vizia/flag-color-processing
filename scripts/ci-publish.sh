#!/bin/sh
git config --global user.email "estocker+gitbot@brandwatch.com"
git config --global user.name "Vizia CI Bot"

# ensures origin is authed
git remote set-url origin https://${GH_TOKEN}@github.com/vizia/flags.git

npx standard-version

npm publish

git push origin master && git push origin master --tags
