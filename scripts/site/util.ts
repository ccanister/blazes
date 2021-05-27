export function html2Escape(sHtml: string) {
  return sHtml.replace(/[<>&"]/gm, function (c) {
    return { "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c];
  });
}
