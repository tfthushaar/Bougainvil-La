#!/usr/bin/env python3
"""Scores every venue photo by edge-variance (a cheap blank/blurry detector)
and writes lib/data/gallery-manifest.json with the files that pass. Re-run
after prepare-images.py regenerates public/images/venues/*.

Threshold tuned by inspecting the score distribution — see printed scores,
adjust THRESHOLD if the split between good/bad photos doesn't look right.

Requires: pip install pillow numpy
"""
import json
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

PROJECT_DIR = Path(__file__).resolve().parent.parent
VENUES_DIR = PROJECT_DIR / "public/images/venues"
MANIFEST_OUT = PROJECT_DIR / "lib/data/gallery-manifest.json"
THRESHOLD = 800


def edge_variance(path: Path) -> float:
    img = Image.open(path).convert("L").resize((400, 400))
    edges = img.filter(ImageFilter.FIND_EDGES)
    return float(np.array(edges).var())


def main():
    manifest = {}
    all_scores = []

    for venue_dir in sorted(VENUES_DIR.iterdir()):
        if not venue_dir.is_dir():
            continue
        slug = venue_dir.name
        manifest[slug] = {}
        for category in ("with-decor", "without-decor"):
            cat_dir = venue_dir / category
            if not cat_dir.exists():
                manifest[slug][category] = []
                continue
            passing = []
            for f in sorted(cat_dir.glob("*.webp")):
                score = edge_variance(f)
                all_scores.append((slug, category, f.name, score))
                if score >= THRESHOLD:
                    passing.append(f.name)
            manifest[slug][category] = passing

    MANIFEST_OUT.write_text(json.dumps(manifest, indent=2) + "\n")

    print(f"Threshold: {THRESHOLD}\n")
    for slug, category, name, score in sorted(all_scores, key=lambda x: x[3]):
        mark = "PASS" if score >= THRESHOLD else "fail"
        print(f"{mark}  {score:8.1f}  {slug}/{category}/{name}")

    total = len(all_scores)
    passed = sum(1 for *_, s in all_scores if s >= THRESHOLD)
    print(f"\n{passed}/{total} passed, manifest written to {MANIFEST_OUT}")


if __name__ == "__main__":
    main()
