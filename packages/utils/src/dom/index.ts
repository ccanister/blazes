export function hasClass(el: HTMLElement, className: string): boolean {
  if (!className) return false;

  return el.className.includes(className);
}

export function addClass(el: HTMLElement, className: string) {
  if (!className) return;
  if (hasClass(el, className)) return;

  el.className += ` ${className} `;
}

export function removeClass(el: HTMLElement, className: string) {
  if (!className) return;
  if (!hasClass(el, className)) return;

  el.className = el.className.replace(className, "").trim();
}

// 插入到子元素头部
export function prepend(el: HTMLElement, newEl: HTMLElement) {
  el.insertBefore(newEl, el.children[0]);
}

export function insertAfter<T extends Element>(
  newChild: T,
  refChild: Element
): T {
  const parent = refChild.parentElement;
  if (!parent) {
    throw new Error("没有父节点");
  }
  if (parent.lastChild === refChild) {
    parent.appendChild(newChild);
  } else {
    parent.insertBefore(newChild, refChild.nextElementSibling);
  }
  return newChild;
}
