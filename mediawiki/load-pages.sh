 #!/bin/sh

echo 'Load pages'

find pages -name "*.txt" | while read path; do
  # Remove extension
  title="${path%.*}"

  case "$title" in
  */ns/*)
    # Remove "pages/ns/"
    title="${title#*pages/ns/}"
    # Insert colons
    title=`echo $title | sed 's/\//:/'`
    ;;
  *)
    # Remove "pages/"
    title="${title#*pages/}"
    ;;
  esac

  echo $title
  php maintenance/edit.php --no-rc -b "$title" < "$path"
done
