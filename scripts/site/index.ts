import * as path from "path";
import * as fs from "fs";
import { SiteConfig } from "./type";
const klawSync = require("klaw-sync");
const MarkdownIt = require("markdown-it");
const MarkdownItContainer = require("markdown-it-container");

const md = new MarkdownIt();
// md.use(MarkdownItContainer, "demo", {
//     validate: function(params) {
//         console.log(params);
//         return true;
//         // return params.trim().match(//)
//     },
//   render: function (tokens, idx) {
//     console.log(tokens);
//     console.log(idx);
//     return "";
//   },
// });
md.use(require("markdown-it-container"), "demo", {
  validate: function (params) {
    return params.trim().match(/^demo\s*(.*)$/);
  },

  render: function (tokens, idx) {
    const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
    console.log("m:");
    console.log(m);
    if (tokens[idx].nesting === 1) {
      const content =
        tokens[idx + 1].type === "fence" ? tokens[idx + 1].content : "";
      console.log(content);
      // opening tag
      return "<code-box>" + "\n";
    } else {
      // closing tag
      return "</code-box>\n";
    }
  },
});

const rootDir = path.resolve(__dirname, "../../");
const siteConfig = require(path.join(
  rootDir,
  "src/site.config.js"
)) as SiteConfig;

for (const m of siteConfig.modules) {
  const mdFiles = klawSync(m.dir.src, {
    nodir: false,
    filter: (item) => {
      if (m.dir.hasSubDir && item.stats.isDirectory()) {
        return true;
      }
      return path.extname(item.path) === ".md";
    },
  }).filter((item) => path.extname(item.path) === ".md");
  for (const file of mdFiles) {
    fs.readFile(file.path, "utf8", (_, source) => {
      console.log(md.render(source));
      //   md.render(source);
    });
  }
}

// const codes: any[] = [
//   {
//     id: "components-avatar-list-maxLength",
//     meta: {
//       title: { "zh-CN": "要显示的最大项目", "en-US": "Max Items to Show" },
//       order: 0,
//     },
//     summary:
//       "<p><code>maxLength</code> attribute specifies the maximum number of items to show while <code>excessItemsStyle</code> style the excess\nitem component.</p>",
//     code:
//       'import { Component } from \'@angular/core\';\n\n@Component({\n  selector: \'components-avatar-list-maxLength\',\n  template: ` <avatar-list size="mini" maxLength="3" [excessItemsStyle]="{ color: \'#f56a00\', backgroundColor: \'#fde3cf\' }">\n    <avatar-list-item tips="Jake" src="https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png"></avatar-list-item>\n    <avatar-list-item tips="Andy" src="https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png"></avatar-list-item>\n    <avatar-list-item tips="Niko" src="https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png"></avatar-list-item>\n    <avatar-list-item tips="Cipchk" text="Cipchk"></avatar-list-item>\n    <avatar-list-item tips="heart-o" icon="heart-o"></avatar-list-item>\n  </avatar-list>`,\n})\nexport class ComponentsAvatarListMaxLengthComponent {}',
//     name: "maxLength",
//     urls: "packages/abc/avatar-list/demo/maxLength.md",
//     type: "demo",
//     lang: "ts",
//     componentName: "ComponentsAvatarListMaxLengthComponent",
//     point: 0,
//   },
//   {
//     id: "components-avatar-list-simple",
//     meta: { title: { "zh-CN": "基础样例", "en-US": "Basic Usage" }, order: 0 },
//     summary: {
//       "zh-CN": "<p>最简单的用法。</p>",
//       "en-US": "<p>Simplest of usage.</p>",
//     },
//     code:
//       'import { Component } from \'@angular/core\';\n\n@Component({\n  selector: \'components-avatar-list-simple\',\n  template: ` <avatar-list size="mini">\n    <avatar-list-item tips="Jake" src="https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png"></avatar-list-item>\n    <avatar-list-item tips="Andy" src="https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png"></avatar-list-item>\n    <avatar-list-item tips="Niko" src="https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png"></avatar-list-item>\n    <avatar-list-item tips="Cipchk" text="Cipchk"></avatar-list-item>\n    <avatar-list-item tips="heart-o" icon="heart-o"></avatar-list-item>\n  </avatar-list>`,\n})\nexport class ComponentsAvatarListSimpleComponent {}',
//     name: "simple",
//     urls: "packages/abc/avatar-list/demo/simple.md",
//     type: "demo",
//     lang: "ts",
//     componentName: "ComponentsAvatarListSimpleComponent",
//     point: 1,
//   },
// ];

// const item: any = {
//   cols: 1,
//   urls: {
//     "en-US": "packages/abc/avatar-list/index.en-US.md",
//     "zh-CN": "packages/abc/avatar-list/index.zh-CN.md",
//   },
//   content: {
//     "en-US": {
//       content:
//         '<section class="markdown"><p>A list of user\'s avatar for project or group member list frequently. If a large or small avatar-list is desired, set the <code>size</code> property to either <code>large</code> or <code>small</code> and <code>mini</code> respectively. Omit the <code>size</code> property for a avatar-list with the default size.</p></section>',
//       api:
//         '<h2 id="API"><a class="lake-link"><i data-anchor="API"></i></a>API</h2><h3 id="avatar-list"><a class="lake-link"><i data-anchor="avatar-list"></i></a>avatar-list</h3><table><thead><tr><th>Property</th><th>Description</th><th>Type</th><th>Default</th></tr></thead><tbody><tr><td><code>[size]</code></td><td>size of list</td><td><code>\'large\',\'small\',\'mini\',\'default\'</code></td><td><code>\'default\'</code></td></tr><tr><td><code>[maxLength]</code></td><td>max items to show</td><td><code>number</code></td><td>-</td></tr><tr><td><code>[excessItemsStyle]</code></td><td>the excess item style</td><td><code>{ [key: string]: string }</code></td><td>-</td></tr></tbody></table><h3 id="avatar-list-item"><a class="lake-link"><i data-anchor="avatar-list-item"></i></a>avatar-list-item</h3><table><thead><tr><th>Property</th><th>Description</th><th>Type</th><th>Default</th></tr></thead><tbody><tr><td><code>[tips]</code></td><td>title tips for avatar item</td><td><code>string</code></td><td>-</td></tr><tr><td><code>[src]</code></td><td>the address of the image for an image avatar</td><td><code>string</code></td><td>-</td></tr><tr><td><code>[text]</code></td><td>text for avatar item</td><td><code>string</code></td><td>-</td></tr><tr><td><code>[icon]</code></td><td>icon for avatar item</td><td><code>string</code></td><td>-</td></tr></tbody></table>',
//       meta: {
//         type: "Basic",
//         title: "avatar-list",
//         subtitle: "AvatarList",
//         cols: 1,
//         module: "import { AvatarListModule } from '@delon/abc/avatar-list';",
//       },
//       toc: [
//         {
//           id: "API",
//           title: "API",
//           h: 2,
//           children: [
//             { id: "avatar-list", title: "avatar-list", h: 3 },
//             { id: "avatar-list-item", title: "avatar-list-item", h: 3 },
//           ],
//         },
//       ],
//     },
//     "zh-CN": {
//       content:
//         '<section class="markdown"><p>一组用户头像，常用在项目/团队成员列表。可通过设置 <code>size</code> 属性来指定头像大小。</p></section>',
//       api:
//         '<h2 id="API"><a class="lake-link"><i data-anchor="API"></i></a>API</h2><h3 id="avatar-list"><a class="lake-link"><i data-anchor="avatar-list"></i></a>avatar-list</h3><table><thead><tr><th>成员</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>[size]</code></td><td>头像大小</td><td><code>\'large\',\'small\',\'mini\',\'default\'</code></td><td><code>\'default\'</code></td></tr><tr><td><code>[maxLength]</code></td><td>要显示的最大项目</td><td><code>number</code></td><td>-</td></tr><tr><td><code>[excessItemsStyle]</code></td><td>多余的项目风格</td><td><code>{ [key: string]: string }</code></td><td>-</td></tr></tbody></table><h3 id="avatar-list-item"><a class="lake-link"><i data-anchor="avatar-list-item"></i></a>avatar-list-item</h3><table><thead><tr><th>成员</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>[tips]</code></td><td>头像展示文案</td><td><code>string</code></td><td>-</td></tr><tr><td><code>[src]</code></td><td>头像图片连接</td><td><code>string</code></td><td>-</td></tr><tr><td><code>[text]</code></td><td>文本类头像</td><td><code>string</code></td><td>-</td></tr><tr><td><code>[icon]</code></td><td>图标类型</td><td><code>string</code></td><td>-</td></tr></tbody></table>',
//       meta: {
//         type: "Basic",
//         title: "avatar-list",
//         subtitle: "用户头像列表",
//         cols: 1,
//         module: "import { AvatarListModule } from '@delon/abc/avatar-list';",
//       },
//       toc: [
//         {
//           id: "API",
//           title: "API",
//           h: 2,
//           children: [
//             { id: "avatar-list", title: "avatar-list", h: 3 },
//             { id: "avatar-list-item", title: "avatar-list-item", h: 3 },
//           ],
//         },
//       ],
//     },
//   },
//   demo: true,
// };
