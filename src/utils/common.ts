export function escape2Html(str: string) {
  const temp = document.createElement("div");
  temp.innerHTML = str;
  const output = temp.innerText || temp.textContent;
  return output || "";
}
