#!/bin/bash
# Generates a Cypress screenshot gallery with search/filter

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
    .spec-title { background: #e0e0e0; padding: 8px; font-size: 1.2em; border-radius: 4px; }
    .gallery { display: flex; flex-wrap: wrap; gap: 16px; margin-top: 12px; }
    .shot { background: #fff; border: 1px solid #ccc; border-radius: 4px; padding: 8px; width: 320px; box-shadow: 2px 2px 6px #ddd; }
    .shot img { max-width: 100%; border-radius: 2px; }
    .caption { font-size: 0.95em; color: #444; margin-top: 4px; word-break: break-all; }
    .hidden { display: none !important; }
  </style>
</head>
<body>
  <h1>Cypress Screenshot Gallery</h1>
  <input id="search" type="text" placeholder="Filter by test name or spec file...">
  <div id="gallery-root">
EOF

  for spec in $(find ./public/screenshots -mindepth 1 -maxdepth 1 -type d | sort); do
    specname=$(basename "$spec")
    echo "<div class=\"spec-group\" data-spec=\"$specname\">" >> ./public/screenshots/index.html
    echo "<div class=\"spec-title\">$specname</div>" >> ./public/screenshots/index.html
    echo "<div class=\"gallery\">" >> ./public/screenshots/index.html
    for img in "$spec"/*.png; do
      imgfile=$(basename "$img")
      relpath="$specname/$imgfile"
      caption="${imgfile%.png}"
      echo "<div class=\"shot\" data-caption=\"$caption\" data-spec=\"$specname\"><a href=\"$relpath\" target=\"_blank\"><img src=\"$relpath\" alt=\"$caption\"></a><div class=\"caption\">$caption</div></div>" >> ./public/screenshots/index.html
    done
    echo "</div></div>" >> ./public/screenshots/index.html
  done

cat <<'EOF' >> ./public/screenshots/index.html
  </div>
  <script>
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
  </script>
</body>
</html>
EOF
fi