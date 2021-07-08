export function escape2Html(str: string) {
  const temp = document.createElement("div");
  temp.innerHTML = str;
  const output = temp.innerText || temp.textContent;
  return output || "";
}

export function underlineToHump(str: string) {
  return str.replace(/-(\w)/g, function (_, $1) {
    return $1.toUpperCase();
  });
}
