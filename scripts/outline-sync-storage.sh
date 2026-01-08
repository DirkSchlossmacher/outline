#!/usr/bin/env bash
set -euo pipefail

SRC="/var/lib/docker/volumes/outline-repo_storage/_data"
DEST="/home/gqhadmin/Desktop/outline-repo/outline-local-backups"

mkdir -p "$DEST"

ts=$(date -u +"%Y-%m-%dT%H%M%SZ")
archive="$DEST/outline-files-$ts.tar.gz"

echo "[Outline Local Backup] $(date -u +"%Y-%m-%dT%H:%M:%SZ") – creating $archive"
sudo tar -C "$SRC" -czf "$archive" .
sudo chown gqhadmin:gqhadmin "$archive"

find "$DEST" -type f -mmin +2880 -delete
