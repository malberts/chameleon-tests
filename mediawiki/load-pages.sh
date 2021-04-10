 #!/bin/sh

for path in pages/**/*.txt pages/*.txt; do
  # Remove "pages/"
  title="${path#*pages/}"

  # Remove extension
  title="${title%.*}"

  # Insert colons
  title=`echo $title | sed 's/\//:/'`

  php maintenance/edit.php --no-rc -b "$title" < "$path"
done
