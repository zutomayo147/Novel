import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
MEDIA_ROOT = os.path.join(BASE_DIR, "media")
MEDIA_URL = "/media/"
print(MEDIA_ROOT)
a = str(MEDIA_ROOT)
os.chdir(a)
print(os.getcwd())