import os
from PIL import Image

TARGET_WIDTH = 1200
TARGET_HEIGHT = 630
TARGET_RATIO = TARGET_WIDTH / TARGET_HEIGHT  # ~1.90476

os.makedirs('assets/og', exist_ok=True)

configs = [
    {
        'tag': 'og-index.jpg',
        'source': 'assets/wall-rope-teacher.jpg',
        'align': 'center'
    },
    {
        'tag': 'og-classes.jpg',
        'source': 'assets/wall-rope-inversion.jpg',
        'align': 'center'
    },
    {
        'tag': 'og-assessment.jpg',
        'source': 'assets/assessment-consult-main.jpg',
        'align': 'center'
    },
    {
        'tag': 'og-neck-release.jpg',
        'source': 'assets/assessment-consult-wide.jpg',
        'align': 'center'
    },
    {
        'tag': 'og-reviews.jpg',
        'source': 'assets/hero-class.jpg',
        'align': 'center'
    },
    {
        'tag': 'og-blog.jpg',
        'source': 'assets/blog-wallropeintro.jpg',
        'align': 'center'
    },
    {
        'tag': 'og-beginner.jpg',
        'source': 'assets/gentle-seated-calm-stretch.png',
        'align': 'center'
    },
    {
        'tag': 'og-contact.jpg',
        'source': 'assets/wall-rope-teacher.jpg',
        'align': 'center'
    },
    {
        'tag': 'og-videos.jpg',
        'source': 'assets/hero-class.jpg',
        'align': 'center'
    },
    {
        'tag': 'og-self-test.jpg',
        'source': 'assets/quiz-open.jpg',
        'align': 'center'
    },
    {
        'tag': 'og-about.jpg',
        'source': 'assets/wall-rope-teacher.jpg',
        'align': 'center'
    }
]

def crop_and_resize(img, target_w, target_h, align='center'):
    img = img.convert('RGB')
    orig_w, orig_h = img.size
    orig_ratio = orig_w / orig_h

    if orig_ratio > TARGET_RATIO:
        # Original is wider than target: fit height, crop width
        crop_h = orig_h
        crop_w = int(orig_h * TARGET_RATIO)
        if align == 'left':
            left = 0
        elif align == 'right':
            left = orig_w - crop_w
        else:
            left = (orig_w - crop_w) // 2
        top = 0
    else:
        # Original is taller than target: fit width, crop height
        crop_w = orig_w
        crop_h = int(orig_w / TARGET_RATIO)
        left = 0
        if align == 'top':
            top = 0
        elif align == 'bottom':
            top = orig_h - crop_h
        else:
            top = (orig_h - crop_h) // 2

    box = (left, top, left + crop_w, top + crop_h)
    cropped = img.crop(box)
    resized = cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)
    return resized

for cfg in configs:
    src_path = cfg['source']
    out_path = os.path.join('assets/og', cfg['tag'])
    if not os.path.exists(src_path):
        print(f"Skipping {cfg['tag']}: {src_path} not found")
        continue
    
    with Image.open(src_path) as im:
        result = crop_and_resize(im, TARGET_WIDTH, TARGET_HEIGHT, cfg['align'])
        result.save(out_path, format='JPEG', quality=92, optimize=True)
        file_size_kb = os.path.getsize(out_path) / 1024
        print(f"Generated {out_path:25} ({result.size[0]}x{result.size[1]}) - {file_size_kb:.1f} KB")

print("All 1200x630 OG images generated successfully!")
