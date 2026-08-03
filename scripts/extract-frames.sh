#!/usr/bin/env bash
# Regenerates public/frames/hero/*.webp and public/videos/hero.mp4 from
# public/videos/hero-source.mp4. Re-run this any time hero-source.mp4 is
# swapped for a higher-resolution master.
#
# Requires ffmpeg + ffprobe on PATH and the Real-ESRGAN ncnn-vulkan binary
# (realesrgan-ncnn-vulkan.exe + its models/ folder) — set REALESRGAN_DIR
# below to point at it.
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SOURCE="$PROJECT_DIR/assets/source/hero-source.mp4"
FRAMES_OUT="$PROJECT_DIR/public/frames/hero"
FALLBACK_VIDEO="$PROJECT_DIR/public/videos/hero.mp4"
WORK="$(mktemp -d)"

REALESRGAN_DIR="${REALESRGAN_DIR:?Set REALESRGAN_DIR to the folder containing realesrgan-ncnn-vulkan.exe}"
REALESRGAN_BIN="$REALESRGAN_DIR/realesrgan-ncnn-vulkan.exe"

echo "Work dir: $WORK"
mkdir -p "$WORK/raw" "$WORK/upscaled" "$FRAMES_OUT"

echo "[1/4] Sampling raw frames at 12fps..."
ffmpeg -y -i "$SOURCE" -vf fps=12 "$WORK/raw/frame_%04d.png"

echo "[2/4] AI upscale/restore (Real-ESRGAN x4plus)..."
"$REALESRGAN_BIN" -i "$WORK/raw" -o "$WORK/upscaled" -n realesrgan-x4plus -s 4

echo "[3/4] Downscaling to web target, grading, and converting to WebP..."
# Contrast/saturation/gamma lift, a subtle vignette, and a moderate luma-only
# unsharp pass — tuned for a punchier, cinematic look on top of the
# AI-restored detail. `delogo` removes the fixed-position source watermark
# (found at ~x1695,y860 in the 1920x1080 frame) before any of that.
DELOGO_FILTER="delogo=x=1695:y=860:w=95:h=85:show=0"
GRADE_FILTER="eq=contrast=1.21:saturation=1.3:brightness=-0.02:gamma=0.97,vignette=PI/5,unsharp=5:5:0.9:5:5:0.0"
rm -f "$FRAMES_OUT"/frame_*.webp
for f in "$WORK/upscaled"/frame_*.png; do
  name="$(basename "$f" .png)"
  ffmpeg -y -i "$f" -vf "scale=1920:-1:flags=lanczos,$DELOGO_FILTER,$GRADE_FILTER" -q:v 82 "$FRAMES_OUT/$name.webp"
done

echo "[4/4] Rebuilding fallback video from enhanced frames..."
ffmpeg -y -framerate 12 -i "$FRAMES_OUT/frame_%04d.webp" -pix_fmt yuv420p -r 12 "$FALLBACK_VIDEO"

echo "Done. Frames: $(ls "$FRAMES_OUT"/frame_*.webp | wc -l), fallback video: $FALLBACK_VIDEO"
rm -rf "$WORK"
