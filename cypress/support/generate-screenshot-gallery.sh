#!/bin/bash
# Generates a Cypress screenshot gallery with search/filter and lightbox

if [ -d ./public/screenshots ]; then
cat <<EOF > ./public/screenshots/index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Cypress Screenshot Gallery</title>
  <style>
    body { font-family: sans-serif; background: #f8f8f8; color: #222; }
    h1 { text-align: center; }
    #search { display: block; margin: 20px auto 30px auto; padding: 8px; width: 60%; font-size: 1.1em; border-radius: 4px; border: 1px solid #bbb; }
    .spec-group { margin-bottom: 40px; }
    .spec-title { background: #e0e0e0; padding: 8px; font-size: 1.2em; border-radius: 4px; display: flex; align-items: center; }
    .img-count { font-size: 0.9em; color: #888; margin-left: 10px; }
    .gallery { display: flex; flex-wrap: wrap; gap: 16px; margin-top: 12px; }
    .shot { background: #fff; border: 1px solid #ccc; border-radius: 4px; padding: 8px; width: 320px; box-shadow: 2px 2px 6px #ddd; position: relative; }
    .shot img { max-width: 100%; border-radius: 2px; cursor: pointer; transition: box-shadow 0.2s; }
    .shot img:hover { box-shadow: 0 0 0 4px #2196f3; }
    .caption { font-size: 0.95em; color: #444; margin-top: 4px; word-break: break-all; }
    .hidden { display: none !important; }
    #lightbox { display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.8); align-items:center; justify-content:center; z-index:1000; }
    #lightbox-img { max-width:90vw; max-height:90vh; border:4px solid #fff; border-radius:8px; box-shadow:0 0 24px #000; }
    #backToTop { position:fixed;bottom:30px;right:30px;display:none;padding:10px 16px;font-size:18px;border-radius:50%;border:none;background:#444;color:#fff;cursor:pointer;z-index:1001; }
  </style>
</head>
<body>
  <h1>Cypress Screenshot Gallery</h1>
  <input id="search" type="text" placeholder="Filter by test name or spec file...">
  <div id="gallery-root">
EOF

  for spec in $(find ./public/screenshots -mindepth 1 -maxdepth 1 -type d | sort); do
    specname=$(basename "$spec")
    imgcount=$(ls "$spec"/*.png 2>/dev/null | wc -l)
    echo "<div class=\"spec-group\" data-spec=\"$specname\">" >> ./public/screenshots/index.html
    echo "<div class=\"spec-title\">$specname <span class=\"img-count\">($imgcount)</span></div>" >> ./public/screenshots/index.html
    echo "<div class=\"gallery\">" >> ./public/screenshots/index.html
    for img in "$spec"/*.png; do
      imgfile=$(basename "$img")
      relpath="$specname/$imgfile"
      caption="${imgfile%.png}"
      echo "<div class=\"shot\" data-caption=\"$caption\" data-spec=\"$specname\"><a href=\"$relpath\" target=\"_blank\"><img src=\"$relpath\" alt=\"$caption\" title=\"Click to enlarge\"></a><div class=\"caption\">$caption</div></div>" >> ./public/screenshots/index.html
    done
    echo "</div></div>" >> ./public/screenshots/index.html
  done

cat <<'EOF' >> ./public/screenshots/index.html
  </div>
  <div id="lightbox" onclick="this.style.display='none'">
    <img id="lightbox-img" src="">
  </div>
  <button id="backToTop" title="Back to top">↑</button>
  <script>
    // Search/filter functionality
    const search = document.getElementById('search');
    search.addEventListener('input', function() {
      const val = this.value.toLowerCase();
      document.querySelectorAll('.shot').forEach(div => {
        const caption = div.getAttribute('data-caption').toLowerCase();
        const spec = div.getAttribute('data-spec').toLowerCase();
        if (caption.includes(val) || spec.includes(val)) {
          div.classList.remove('hidden');
        } else {
          div.classList.add('hidden');
        }
      });
      // Hide spec groups if all their shots are hidden
      document.querySelectorAll('.spec-group').forEach(group => {
        const shots = group.querySelectorAll('.shot');
        const anyVisible = Array.from(shots).some(div => !div.classList.contains('hidden'));
        group.style.display = anyVisible ? '' : 'none';
      });
    });

    // Lightbox functionality
    document.querySelectorAll('.shot img').forEach(img => {
      img.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('lightbox-img').src = this.src;
        document.getElementById('lightbox').style.display = 'flex';
      });
    });
    document.getElementById('lightbox').addEventListener('click', function() {
      this.style.display = 'none';
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        document.getElementById('lightbox').style.display = 'none';
      }
    });

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
      backToTop.style.display = window.scrollY > 200 ? 'block' : 'none';
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  </script>
</body>
</html>
EOF
fi