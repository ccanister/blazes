import { File, MenuItem, ModuleConfig } from "./type";
import { writeFileRecursive } from "./util";
const _ = require("underscore");

const template = _.template(`
export const meta = <%= meta %>
`);

export function generateMenu(
  rootDir: string,
  files: File[],
  config: ModuleConfig
) {
  const menus: { [key: string]: MenuItem } = {};
  files.forEach((file) => {
    const { type, title, subtitle, order } = file.doc!;
    const menuItem: MenuItem = menus[type] || (menus[type] = { type, subs: [] });
    menuItem.subs.push({
      title,
      subtitle,
      path: `/${config.name}/${file.name}`,
      order,
    });
  });
  Object.keys(menus).forEach((type) => {
    menus[type].subs.sort((s1, s2) => s1.order - s2.order);
  });
  const menu = { name: config.name, items: Object.values(menus) };
  writeFileRecursive(
    `${rootDir}/src/views/${config.name}/meta.ts`,
    template({ meta: JSON.stringify(menu) })
  );
}
