export const formatDeviDirective = (
  el: HTMLElement,
  binding: { value: number | { num: number; fixed?: number } }
) => {
  if (typeof binding.value === "object") {
    const { num, fixed } = binding.value;
    el.innerText = formatDeci(num, fixed);
  } else {
    el.innerText = formatDeci(binding.value);
  }
};

export function formatDeci(num: number, fixed?: number) {
  return `${
    fixed
      ? (num || 0).toLocaleString("hanidec", {
          maximumFractionDigits: 2,
        })
      : num
  }`
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const units = [
  { label: "亿", value: 100000000 },
  { label: "万", value: 10000 },
  { label: "", value: 1 },
];

export function transToTenThousand(value: string, fixed = 0): string {
  for (let i = 0; i < units.length; i++) {
    const result = +value / units[i].value;
    if (result >= 1) {
      return `${result.toFixed(fixed)}${units[i].label}`;
    }
  }
  return value;
}
