#!/usr/bin/env python3
"""Remove off-white/beige background from logo and make it transparent."""
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Install Pillow: pip install Pillow")
    raise

def luminance(r, g, b):
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255

def saturation(r, g, b):
    mx, mn = max(r, g, b), min(r, g, b)
    if mx == 0:
        return 0
    return (mx - mn) / mx

def main():
    src = Path("/Users/sandeep/.cursor/projects/Users-sandeep-Documents-sarin-rakura/assets/image-a8a24b8b-da15-4959-b5e9-97deb4176612.png")
    if not src.exists():
        print("Source image not found.")
        return 1

    out_dir = Path(__file__).resolve().parent.parent / "public" / "assets"
    out_dir.mkdir(parents=True, exist_ok=True)
    dst = out_dir / "logo.png"

    img = Image.open(src).convert("RGBA")
    data = img.getdata()
    new_data = []
    # Remove pixels that are very light and low saturation (white/off-white/beige)
    # Keep golden/brown logo (darker, more saturated)
    for r, g, b, a in data:
        L = luminance(r, g, b)
        S = saturation(r, g, b)
        if L >= 0.92 and S <= 0.15:
            new_data.append((r, g, b, 0))
        else:
            new_data.append((r, g, b, a))
    img.putdata(new_data)
    img.save(dst, "PNG")
    print(f"Saved transparent logo to {dst}")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
