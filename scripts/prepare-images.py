#!/usr/bin/env python3
"""Unzips the client's materials/ folder, converts every photo (HEIC/JPG/JPEG)
to web-ready WebP, and organizes them into public/images/. Re-run any time the
materials folder is updated with new/replacement photos.

Replaces the old ffmpeg-based scripts/prepare-images.sh, which had a real bug:
ffmpeg -map 0:v:0 grabbed a single 512x512 tile from Apple's grid-tiled HEIC
photos instead of the reconstructed full image, producing blank/blurry output
for any HEIC photo that used grid encoding (common on iPhone). Every affected
image looked like an unusable close-up and got silently discarded by the
quality filter. pillow-heif (libheif) decodes the HEIC grid correctly.

Requires: pip install pillow-heif pillow
"""
import zipfile
from pathlib import Path

import pillow_heif
from PIL import Image, ImageOps

MATERIALS_DIR = Path("C:/Users/Admin/Desktop/materials")
PROJECT_DIR = Path(__file__).resolve().parent.parent
IMAGES_OUT = PROJECT_DIR / "public/images"
WORK = PROJECT_DIR / ".tmp-image-prep"
MAX_WIDTH = 2000
WEBP_QUALITY = 88

VENUES = [
    ("sumeera", "sumeera/With Decor-20260803T181213Z-1-001.zip", "sumeera/Without decor-20260803T181216Z-1-001.zip"),
    ("floral-trellis", "Floral Trellis/With Decor-20260803T181324Z-1-001.zip", "Floral Trellis/Without Decor-20260803T181326Z-1-001.zip"),
    ("divine-bells", "divine bells/With Decor-20260803T181506Z-1-001.zip", "divine bells/Without Decor-20260803T181507Z-1-001.zip"),
    ("margarita", "MARGARITA/With Decor-20260803T181705Z-1-001.zip", "MARGARITA/Without Decor-20260803T181707Z-1-001.zip"),
    ("ice-spice", "ICE SPICE/With Decor-20260803T182049Z-1-001.zip", "ICE SPICE/Without Decor-20260803T182051Z-1-001.zip"),
]

ROOMS = [
    ("bridal-suite", "Bride room-20260803T182359Z-1-001.zip"),
    ("grooms-suite", "Grooms room-20260803T182412Z-1-001.zip"),
    ("family-rooms", "Family room-20260803T182425Z-1-001.zip"),
]


def unzip_to(zip_path: Path, dest: Path):
    dest.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(zip_path) as zf:
        zf.extractall(dest)


def load_image(path: Path) -> Image.Image:
    if path.suffix.lower() == ".heic":
        heif_file = pillow_heif.open_heif(str(path), convert_hdr_to_8bit=True)
        img = heif_file.to_pillow()
    else:
        img = Image.open(path)
        # PIL does NOT auto-rotate JPEGs per their EXIF orientation tag —
        # pillow-heif already applies it for HEIC, but JPEG needs this
        # explicit step or sideways/upside-down phone photos slip through.
        img = ImageOps.exif_transpose(img)
    return img.convert("RGB")


def convert_dir(src: Path, dest: Path):
    dest.mkdir(parents=True, exist_ok=True)
    files = sorted(
        p for p in src.rglob("*")
        if p.suffix.lower() in (".heic", ".jpg", ".jpeg")
    )
    for i, f in enumerate(files, start=1):
        img = load_image(f)
        if img.width > MAX_WIDTH:
            ratio = MAX_WIDTH / img.width
            img = img.resize((MAX_WIDTH, round(img.height * ratio)), Image.LANCZOS)
        out = dest / f"{i:03d}.webp"
        img.save(out, "WEBP", quality=WEBP_QUALITY)
    return len(files)


def main():
    print(f"Materials: {MATERIALS_DIR}")
    print(f"Work dir: {WORK}")

    print("\n=== Celebration space photos ===")
    for slug, with_zip, without_zip in VENUES:
        print(f"-- {slug} --")
        unzip_to(MATERIALS_DIR / with_zip, WORK / slug / "with")
        unzip_to(MATERIALS_DIR / without_zip, WORK / slug / "without")
        n1 = convert_dir(WORK / slug / "with", IMAGES_OUT / "venues" / slug / "with-decor")
        n2 = convert_dir(WORK / slug / "without", IMAGES_OUT / "venues" / slug / "without-decor")
        print(f"   with-decor: {n1}, without-decor: {n2}")

    print("\n=== Room photos ===")
    for slug, zip_name in ROOMS:
        print(f"-- {slug} --")
        unzip_to(MATERIALS_DIR / zip_name, WORK / "rooms" / slug)
        n = convert_dir(WORK / "rooms" / slug, IMAGES_OUT / "rooms" / slug)
        print(f"   {n} photos")

    total = sum(1 for _ in IMAGES_OUT.rglob("*.webp"))
    print(f"\nDone. {total} images under {IMAGES_OUT}")


if __name__ == "__main__":
    main()
