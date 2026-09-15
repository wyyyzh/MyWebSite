"""
素材生成脚本：一键产出社交分享图与站点图标。

用法（需要先装 Pillow）：
    python assets-source/make_assets.py

产出：
    public/og.png        1200x630 社交分享卡片
    public/favicon.png    64x64   浏览器图标
    public/apple-touch-icon.png   180x180 iOS 图标

改文案：直接改下面 CONFIG 区域，重新运行即可。
"""

import os
import random
from PIL import Image, ImageDraw, ImageFont

# ============================ CONFIG ============================
SITE_TITLE_LINES = ["我不是一个完成品。", "我是一段版本历史。"]
SITE_SUBTITLE = "AI 产品经理 / 独立开发者"
SITE_NAME = "林知远"
SITE_VERSION = "v1.0.0"
HANDLE = "@life-git"

# 配色（与 src/index.css 的 @theme 保持一致）
PAPER = (247, 243, 232)
PAPER_SOFT = (253, 251, 246)
INK = (33, 31, 28)
INK_SOFT = (87, 83, 78)
INK_FAINT = (139, 133, 122)
LINE = (229, 223, 208)
ACCENT = (47, 111, 79)
CLAY = (194, 96, 63)
LEVELS = [
    (236, 231, 218),
    (207, 224, 211),
    (163, 199, 173),
    (107, 163, 127),
    (47, 111, 79),
]
# ================================================================

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC = os.path.join(BASE, "public")

FONT_CANDIDATES = [
    "C:/Windows/Fonts/msyhbd.ttc",  # 微软雅黑 Bold
    "C:/Windows/Fonts/msyh.ttc",  # 微软雅黑
    "C:/Windows/Fonts/simhei.ttf",  # 黑体
    "C:/Windows/Fonts/simsun.ttc",  # 宋体
    "/System/Library/Fonts/PingFang.ttc",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
]
MONO_CANDIDATES = [
    "C:/Windows/Fonts/consolab.ttf",
    "C:/Windows/Fonts/consola.ttf",
    "C:/Windows/Fonts/courbd.ttf",
    "C:/Windows/Fonts/msyh.ttc",
]


def load_font(candidates, size):
    for path in candidates:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except Exception:
                continue
    return ImageFont.load_default()


def make_og():
    W, H = 1200, 630
    img = Image.new("RGB", (W, H), PAPER)
    d = ImageDraw.Draw(img)

    # 底部深墨色压边，让卡片有重量感
    d.rectangle([0, H - 96, W, H], fill=INK)

    # 右上角色块装饰
    d.rectangle([W - 210, 0, W, 150], fill=PAPER_SOFT, outline=LINE, width=2)
    d.ellipse([W - 140, 40, W - 60, 120], fill=CLAY)
    d.ellipse([W - 190, 40, W - 150, 80], fill=ACCENT)

    f_mono = load_font(MONO_CANDIDATES, 26)
    f_title = load_font(FONT_CANDIDATES, 76)
    f_sub = load_font(FONT_CANDIDATES, 30)
    f_foot = load_font(FONT_CANDIDATES, 26)

    # 顶部小标签
    d.text((80, 72), f"LIFE GIT · {SITE_VERSION}", font=f_mono, fill=ACCENT)

    # 主标题
    y = 150
    for line in SITE_TITLE_LINES:
        d.text((78, y), line, font=f_title, fill=INK)
        y += 104

    # 分隔线
    d.line([80, y + 14, 520, y + 14], fill=LINE, width=2)

    # 副标题
    d.text((80, y + 40), SITE_SUBTITLE, font=f_sub, fill=INK_SOFT)

    # 底部信息条（用 textlength 量真实宽度，避免中英混排重叠）
    name_w = d.textlength(SITE_NAME, font=f_foot)
    d.text((80, H - 60), SITE_NAME, font=f_foot, fill=PAPER)
    d.text((80 + name_w + 22, H - 56), HANDLE, font=f_mono, fill=INK_FAINT)

    # 右侧热力图装饰（12 周 x 7 天）
    random.seed(2026)
    cell, gap = 20, 6
    ox, oy = W - 80 - 12 * (cell + gap), H - 96 - 60 - 7 * (cell + gap)
    for col in range(12):
        for row in range(7):
            lv = random.choice([0, 0, 1, 1, 2, 2, 3, 4])
            x = ox + col * (cell + gap)
            yy = oy + row * (cell + gap)
            d.rounded_rectangle([x, yy, x + cell, yy + cell], radius=4, fill=LEVELS[lv])

    out = os.path.join(PUBLIC, "og.png")
    img.save(out, "PNG", optimize=True)
    print("og.png ->", out)


def make_icon(size, filename):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    s = size / 24.0

    # 两个提交节点 + 一条连线
    d.ellipse(
        [1.8 * s, 8.8 * s, 8.2 * s, 15.2 * s],
        fill=ACCENT,
    )
    d.ellipse(
        [15.8 * s, 8.8 * s, 22.2 * s, 15.2 * s],
        fill=CLAY,
    )
    d.line([8.2 * s, 12 * s, 15.8 * s, 12 * s], fill=INK_FAINT, width=max(1, int(1.6 * s)))

    out = os.path.join(PUBLIC, filename)
    img.save(out, "PNG", optimize=True)
    print(f"{filename} ->", out)


if __name__ == "__main__":
    os.makedirs(PUBLIC, exist_ok=True)
    make_og()
    make_icon(64, "favicon.png")
    make_icon(180, "apple-touch-icon.png")
    print("done.")
