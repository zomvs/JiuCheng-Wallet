#!/bin/sh

set -eu

script_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
project_dir=$(dirname "$script_dir")
env_file="$project_dir/.env.production"
platform=${1:-}

if [ -z "$platform" ]; then
  echo "Usage: sh ./scripts/run-production.sh <ios|android> [react-native options...]" >&2
  exit 1
fi
shift

if [ ! -f "$env_file" ]; then
  echo "Missing $env_file" >&2
  echo "Copy .env.production.example to .env.production and replace every production placeholder." >&2
  exit 1
fi

set -a
. "$env_file"
set +a

require_production_value() {
  key=$1
  value=$(printenv "$key" || true)

  if [ -z "$value" ]; then
    echo "Missing required production value: $key" >&2
    exit 1
  fi

  case "$value" in
    REPLACE_WITH_*|pseudorandompwd|pseudosafeapikey|RABBY_MOBILE_CODE_DEV)
      echo "Replace the non-production value for $key in $env_file" >&2
      exit 1
      ;;
  esac
}

require_production_value RABBY_MOBILE_KR_PWD
require_production_value RABBY_MOBILE_CODE
require_production_value RABBY_MOBILE_WALLETCONNECT_PROJECT_ID

if [ "${RABBY_MOBILE_BUILD_ENV:-}" != "production" ]; then
  echo "RABBY_MOBILE_BUILD_ENV must be production in $env_file" >&2
  exit 1
fi

if [ "${RABBY_MOBILE_BUILD_CHANNEL:-}" != "appstore" ]; then
  echo "RABBY_MOBILE_BUILD_CHANNEL must be appstore in $env_file" >&2
  exit 1
fi

export APP_ENV=production
export BABEL_ENV=production
export NODE_ENV=production
export RABBY_MOBILE_BUILD_ENV=production
export RABBY_MOBILE_BUILD_CHANNEL=appstore
export buildchannel=appstore

cd "$project_dir"

case "$platform" in
  ios)
    exec yarn react-native run-ios --mode Release --no-packager "$@"
    ;;
  android)
    exec yarn react-native run-android --mode release --no-packager "$@"
    ;;
  *)
    echo "Unsupported platform: $platform" >&2
    exit 1
    ;;
esac
