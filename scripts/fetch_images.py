#!/usr/bin/env python3
"""ดาวน์โหลดภาพตัวละครวันพีชจาก One Piece Fandom API ลงโฟลเดอร์ images/"""
import json
import os
import sys
import time
import urllib.parse
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "data", "characters.json")
IMGDIR = os.path.join(ROOT, "images")
os.makedirs(IMGDIR, exist_ok=True)

UA = "Mozilla/5.0 (OnePieceCardBuilder; personal use)"
VALID_EXT = (".png", ".jpg", ".jpeg", ".webp")


def get(url, binary=False):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=40) as r:
        return r.read() if binary else r.read().decode("utf-8")


def api_thumb(title, size=600):
    url = (
        "https://onepiece.fandom.com/api.php?action=query&format=json"
        "&prop=pageimages&redirects=1&pithumbsize=%d&titles=%s"
        % (size, urllib.parse.quote(title))
    )
    d = json.loads(get(url))
    pages = d["query"]["pages"]
    page = next(iter(pages.values()))
    if "thumbnail" not in page:
        return None
    return page["thumbnail"]["source"]


def main():
    with open(DATA, encoding="utf-8") as f:
        chars = json.load(f)

    ok = fail = 0
    changed = False
    for c in chars:
        slug = c["id"]
        existing = [
            fn for fn in os.listdir(IMGDIR) if fn.startswith(slug + ".")
        ]
        if existing and c.get("img") and os.path.exists(os.path.join(ROOT, c["img"])):
            ok += 1
            continue
        try:
            thumb = api_thumb(c["wiki"])
            if not thumb:
                print("NO IMAGE : %s (%s)" % (c["name"], c["wiki"]))
                fail += 1
                continue
            ext = os.path.splitext(thumb.split("?")[0])[1].lower()
            if ext not in VALID_EXT:
                ext = ".png"
            fname = slug + ext
            path = os.path.join(IMGDIR, fname)
            if not os.path.exists(path):
                data = get(thumb, binary=True)
                with open(path, "wb") as f:
                    f.write(data)
            c["img"] = "images/" + fname
            changed = True
            ok += 1
            print("OK       : %-26s -> %s (%d KB)" % (c["name"], fname, os.path.getsize(path) // 1024))
        except Exception as e:  # noqa
            print("FAIL     : %s -> %s" % (c["name"], e))
            fail += 1
        time.sleep(0.15)

    if changed:
        with open(DATA, "w", encoding="utf-8") as f:
            json.dump(chars, f, ensure_ascii=False, indent=2)

    print("\nสรุป: สำเร็จ %d / ล้มเหลว %d / ทั้งหมด %d" % (ok, fail, len(chars)))
    return 1 if fail else 0


if __name__ == "__main__":
    sys.exit(main())
