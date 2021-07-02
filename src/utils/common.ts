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

export function stripScript(content: string) {
  const result = content.match(/<(script)>([\s\S]+)<\/\1>/);
  return result && result[2] ? result[2].trim() : "";
}

export function stripStyle(content: string) {
  const result = content.match(/<(style)\s*>([\s\S]+)<\/\1>/);
  return result && result[2] ? result[2].trim() : "";
}

export function stripTemplate(content: string) {
  content = content.trim();
  if (!content) {
    return content;
  }
  return content.replace(/<(script|style)[\s\S]+<\/\1>/g, "").trim();
}

export function stripTemplateAndRemoveTemplate(code: string) {
  const result = stripTemplate(code);
  if (result.indexOf("<template>") === 0) {
    return result.replace(/^<template>/, "").replace(/<\/template>$/, "");
  }
  return result;
}
