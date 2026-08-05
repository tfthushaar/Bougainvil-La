#!/usr/bin/env bash
# Unzips the client's materials/ folder, converts every photo (HEIC/JPG/JPEG) to
# web-ready WebP, and organizes them into public/images/. Re-run any time the
# materials folder is updated with new/replacement photos.
#
# Requires ffmpeg on PATH and Python 3 (for zip extraction). Set MATERIALS_DIR
# to the client materials folder (default: C:/Users/Admin/Desktop/materials).
set -euo pipefail

# Windows-style (drive-letter) paths throughout — NOT Git Bash's /c/... form.
# `python3` (the native Windows build) doesn't understand /c/... at all (it
# silently resolves it as a literal folder named "c" under the current
# drive's root instead of erroring), and ffmpeg.exe's MSYS argv translation
# for /c/... is inconsistent from inside a `while read` loop. `pwd -W`
# gives the Windows-style form directly.
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd -W)"
MATERIALS_DIR="${MATERIALS_DIR:-C:/Users/Admin/Desktop/materials}"
IMAGES_OUT="$PROJECT_DIR/public/images"
WORK="$PROJECT_DIR/.tmp-image-prep"
rm -rf "$WORK"
mkdir -p "$WORK"

echo "Materials: $MATERIALS_DIR"
echo "Work dir: $WORK"

# name -> zip path (relative to MATERIALS_DIR), read as "slug|with-decor-zip|without-decor-zip"
VENUES=(
  "sumeera|sumeera/With Decor-20260803T181213Z-1-001.zip|sumeera/Without decor-20260803T181216Z-1-001.zip"
  "floral-trellis|Floral Trellis/With Decor-20260803T181324Z-1-001.zip|Floral Trellis/Without Decor-20260803T181326Z-1-001.zip"
  "divine-bells|divine bells/With Decor-20260803T181506Z-1-001.zip|divine bells/Without Decor-20260803T181507Z-1-001.zip"
  "margarita|MARGARITA/With Decor-20260803T181705Z-1-001.zip|MARGARITA/Without Decor-20260803T181707Z-1-001.zip"
  "ice-spice|ICE SPICE/With Decor-20260803T182049Z-1-001.zip|ICE SPICE/Without Decor-20260803T182051Z-1-001.zip"
)

ROOMS=(
  "bridal-suite|Bride room-20260803T182359Z-1-001.zip"
  "grooms-suite|Grooms room-20260803T182412Z-1-001.zip"
  "family-rooms|Family room-20260803T182425Z-1-001.zip"
)

unzip_to() {
  local zip="$1" dest="$2"
  python3 -c "
import zipfile, sys
with zipfile.ZipFile(sys.argv[1]) as zf:
    zf.extractall(sys.argv[2])
" "$zip" "$dest"
}

convert_dir() {
  local src="$1" dest="$2"
  mkdir -p "$dest"
  local i=1
  # HEIC, JPG, JPEG (case-insensitive), skip RAW/video — sorted for stable ordering
  find "$src" -type f \( -iname "*.heic" -o -iname "*.jpg" -o -iname "*.jpeg" \) | sort | while read -r f; do
    local n
    n=$(printf "%03d" "$i")
    # -map 0:v:0 avoids "complex filtergraph" errors HEIC's multi-item
    # container structure otherwise triggers with a plain -vf. </dev/null
    # stops ffmpeg from stealing the next path off this loop's stdin (it
    # reads stdin for interactive keyboard commands by default).
    ffmpeg -y -i "$f" -map 0:v:0 -vf "scale='min(2000,iw)':-2:flags=lanczos" -q:v 4 "$dest/$n.webp" -loglevel error </dev/null
    i=$((i+1))
  done
}

echo "=== Celebration space photos ==="
for entry in "${VENUES[@]}"; do
  IFS='|' read -r slug with_zip without_zip <<< "$entry"
  echo "-- $slug --"
  mkdir -p "$WORK/$slug/with" "$WORK/$slug/without"
  unzip_to "$MATERIALS_DIR/$with_zip" "$WORK/$slug/with"
  unzip_to "$MATERIALS_DIR/$without_zip" "$WORK/$slug/without"
  convert_dir "$WORK/$slug/with" "$IMAGES_OUT/venues/$slug/with-decor"
  convert_dir "$WORK/$slug/without" "$IMAGES_OUT/venues/$slug/without-decor"
done

echo "=== Room photos ==="
for entry in "${ROOMS[@]}"; do
  IFS='|' read -r slug zip <<< "$entry"
  echo "-- $slug --"
  mkdir -p "$WORK/rooms/$slug"
  unzip_to "$MATERIALS_DIR/$zip" "$WORK/rooms/$slug"
  convert_dir "$WORK/rooms/$slug" "$IMAGES_OUT/rooms/$slug"
done

echo "=== Brand assets ==="
mkdir -p "$IMAGES_OUT/brand" "$IMAGES_OUT/about"
# Full lockup (for e.g. a footer/about placement) and a tight crop of just the
# script wordmark for the nav bar — the full image is too wide/busy (florals,
# tagline lines) to read at nav-bar height.
ffmpeg -y -i "$MATERIALS_DIR/Logo (1).png" -vf "scale='min(1200,iw)':-2:flags=lanczos" "$IMAGES_OUT/brand/logo-full.webp" -loglevel error
ffmpeg -y -i "$MATERIALS_DIR/Logo (1).png" -vf "crop=1100:260:410:370" "$IMAGES_OUT/brand/logo-nav.webp" -loglevel error
cp "$MATERIALS_DIR/Logo (1).png" "$IMAGES_OUT/brand/logo.png"
ffmpeg -y -i "$MATERIALS_DIR/Satin bg.png" -vf "scale='min(2400,iw)':-2:flags=lanczos" -q:v 6 "$IMAGES_OUT/brand/satin-bg.webp" -loglevel error
ffmpeg -y -i "$MATERIALS_DIR/About Us.JPG" -vf "scale='min(2000,iw)':-2:flags=lanczos" -q:v 4 "$IMAGES_OUT/about/about-us.webp" -loglevel error

echo "=== Brochure ==="
cp "$MATERIALS_DIR/Brochure.pdf" "$PROJECT_DIR/public/brochure.pdf"

echo "Done."
find "$IMAGES_OUT" -type f | wc -l
echo "images written under $IMAGES_OUT"
rm -rf "$WORK"
