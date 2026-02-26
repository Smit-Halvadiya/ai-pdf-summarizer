// utils/filenameToTitle.js

export function filenameToTitle(filename) {
  if (!filename) return "";

  // 1. Extension हटाओ (.pdf, .docx, etc.)
  let nameWithoutExt = filename.replace(/\.[^/.]+$/, "");

  // 2. _ और - को space में बदले
  let withSpaces = nameWithoutExt.replace(/[_-]+/g, " ");

  // 3. Capital letters से पहले space डालो (camelCase / PascalCase split)
  let splitCamelCase = withSpaces.replace(/([a-z])([A-Z])/g, "$1 $2");

  // 4. Words को Title Case में बदलो
  let titleCase = splitCamelCase
    .split(" ")
    .filter((w) => w.trim() !== "")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return titleCase;
}
