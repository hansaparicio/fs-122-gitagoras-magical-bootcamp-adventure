#!/usr/bin/env bash
# exit on error
set -o errexit

npm install
npm run build

pip install --upgrade pip
pip install pipenv

pipenv install --dev --deploy --ignore-pipfile
psql "$DATABASE_URL" -c "DROP SCHEMA public CASCADE;"
psql "$DATABASE_URL" -c "CREATE SCHEMA public;"
pipenv run flask db stamp head
pipenv run migrate
pipenv run upgrade