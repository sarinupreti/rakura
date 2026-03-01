#!/usr/bin/env python3
"""
Extract product images and logo from Profile.pdf for the Rakura Thailand site.
Run from repo root with: python3 scripts/extract-pdf-product-images.py /path/to/Profile.pdf

- Extracts all embedded images from PDF pages 12-20 into public/assets/pdf/
- Renders PDF pages 12 and 13 to full PNGs for cropping
- Crops page 12 into 4 Collection tiles (2x2), page 13 into 6 Classic tiles (2x3)
  using configurable regions (tune constants below if crops capture wrong areas)
- Extracts logo: first embedded image on page 0, or top region of page 0, to public/assets/logo.png
"""
import fitz
import os
import sys

# --- Configurable crop regions (tune after inspecting page12_full.png / page13_full.png) ---
# Page 12: Collections (2x2). Skip top pixels to avoid banner/tagline; then split remaining area.
PAGE12_TOP = 280       # Increase if crops still show "PASSION" / "PROUD" banner
PAGE12_LEFT = 0        # Left margin skip
PAGE12_RIGHT = None    # None = use full width
PAGE12_BOTTOM = None   # None = use full height below PAGE12_TOP
PAGE12_COLS = 2
PAGE12_ROWS = 2

# Page 13: First 6 Classic (2x3). Optional header skip.
PAGE13_TOP = 0
PAGE13_LEFT = 0
PAGE13_RIGHT = None
PAGE13_BOTTOM = None
PAGE13_COLS = 3
PAGE13_ROWS = 2

# Logo: extract from page 0. Try first embedded image; else render top region (y from 0 to LOGO_CROP_HEIGHT).
LOGO_PAGE = 0
LOGO_EMBEDDED_INDEX = 0   # First image on logo page
LOGO_CROP_HEIGHT = 220    # Used only if no embedded image found (crop top of page)


def main():
    pdf_path = sys.argv[1] if len(sys.argv) > 1 else "Profile.pdf"
    if not os.path.isfile(pdf_path):
        print(f"Usage: {sys.argv[0]} /path/to/Profile.pdf")
        sys.exit(1)
    out_pdf = "public/assets/pdf"
    out_assets = "public/assets"
    os.makedirs(out_pdf, exist_ok=True)
    os.makedirs(out_assets, exist_ok=True)
    doc = fitz.open(pdf_path)

    # 0) Extract logo from page 0 (first embedded image, or top crop)
    if doc.page_count > LOGO_PAGE:
        page0 = doc[LOGO_PAGE]
        imgs = page0.get_images()
        logo_saved = False
        if len(imgs) > LOGO_EMBEDDED_INDEX:
            try:
                xref = imgs[LOGO_EMBEDDED_INDEX][0]
                pix = fitz.Pixmap(doc, xref)
                logo_path = os.path.join(out_assets, "logo.png")
                pix.save(logo_path)
                print(f"Logo: extracted embedded image from page {LOGO_PAGE+1} -> {logo_path}")
                logo_saved = True
            except Exception as e:
                print(f"Logo: embedded image skip: {e}")
        if not logo_saved:
            try:
                rect = page0.rect
                clip = fitz.Rect(0, 0, rect.width, min(LOGO_CROP_HEIGHT, rect.height))
                pix = page0.get_pixmap(matrix=fitz.Matrix(2, 2), clip=clip, alpha=False)
                logo_path = os.path.join(out_assets, "logo.png")
                pix.save(logo_path)
                print(f"Logo: cropped top of page {LOGO_PAGE+1} -> {logo_path}")
            except Exception as e:
                print(f"Logo: crop skip: {e}")

    # 1) Extract every embedded image from pages 12-20
    for page_num in range(11, 20):
        page = doc[page_num]
        for j, img in enumerate(page.get_images()):
            xref = img[0]
            try:
                pix = fitz.Pixmap(doc, xref)
                path = os.path.join(out_pdf, f"page{page_num+1}_img{j}.png")
                pix.save(path)
                print(f"page{page_num+1} img{j}: {pix.width}x{pix.height}")
            except Exception as e:
                print(f"page{page_num+1} img{j}: skip {e}")

    # 2) Render full pages 12 and 13 for cropping (Collections + first Classic)
    for page_num in [11, 12]:
        page = doc[page_num]
        pix = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
        path = os.path.join(out_pdf, f"page{page_num+1}_full.png")
        pix.save(path)
        print(f"Rendered page{page_num+1} -> {path}")

    doc.close()

    # 3) Crop page12 (2x2) and page13 (2x3) using configurable regions
    try:
        from PIL import Image
        full12 = os.path.join(out_pdf, "page12_full.png")
        full13 = os.path.join(out_pdf, "page13_full.png")
        if os.path.isfile(full12):
            img = Image.open(full12).convert("RGB")
            w, h = img.size
            left = PAGE12_LEFT
            top = PAGE12_TOP
            right = w if PAGE12_RIGHT is None else min(PAGE12_RIGHT, w)
            bottom = h if PAGE12_BOTTOM is None else min(PAGE12_BOTTOM, h)
            cw = (right - left) // PAGE12_COLS
            ch = (bottom - top) // PAGE12_ROWS
            for row in range(PAGE12_ROWS):
                for col in range(PAGE12_COLS):
                    i = row * PAGE12_COLS + col
                    box = (
                        left + col * cw,
                        top + row * ch,
                        left + (col + 1) * cw,
                        top + (row + 1) * ch,
                    )
                    img.crop(box).save(os.path.join(out_pdf, f"page12_crop{i}.png"))
            img.close()
            print("Cropped page12 -> page12_crop0..3")
        if os.path.isfile(full13):
            img = Image.open(full13).convert("RGB")
            w, h = img.size
            left = PAGE13_LEFT
            top = PAGE13_TOP
            right = w if PAGE13_RIGHT is None else min(PAGE13_RIGHT, w)
            bottom = h if PAGE13_BOTTOM is None else min(PAGE13_BOTTOM, h)
            cw = (right - left) // PAGE13_COLS
            ch = (bottom - top) // PAGE13_ROWS
            for row in range(PAGE13_ROWS):
                for col in range(PAGE13_COLS):
                    i = row * PAGE13_COLS + col
                    box = (
                        left + col * cw,
                        top + row * ch,
                        left + (col + 1) * cw,
                        top + (row + 1) * ch,
                    )
                    img.crop(box).save(os.path.join(out_pdf, f"page13_crop{i}.png"))
            img.close()
            print("Cropped page13 -> page13_crop0..5")
    except ImportError:
        print("Install Pillow to generate page12_crop* and page13_crop*: pip install Pillow")

    print("Done.")


if __name__ == "__main__":
    main()
