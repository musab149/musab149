# Usage: python3 -I scripts/sheet.py <dir> <out_prefix> [cols=2] [rows=2] [scale=0.5]
import sys, os
from PIL import Image
d, out = sys.argv[1], sys.argv[2]
cols = int(sys.argv[3]) if len(sys.argv) > 3 else 2
rows = int(sys.argv[4]) if len(sys.argv) > 4 else 2
scale = float(sys.argv[5]) if len(sys.argv) > 5 else 0.5
files = sorted(f for f in os.listdir(d) if f.endswith('.png'))
per = cols * rows
for s in range(0, len(files), per):
    ims = [Image.open(os.path.join(d, f)).convert('RGB') for f in files[s:s+per]]
    w, h = int(ims[0].width * scale), int(ims[0].height * scale)
    sheet = Image.new('RGB', (w * cols + 8 * (cols - 1), h * rows + 8 * (rows - 1)), (255, 0, 128))
    for i, im in enumerate(ims):
        im = im.resize((w, int(im.height * scale)))
        sheet.paste(im, ((i % cols) * (w + 8), (i // cols) * (h + 8)))
    sheet.save(f"{out}{s // per}.jpg", quality=82)
print(len(files))
