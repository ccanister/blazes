const traverse = require("@babel/traverse").default;
const fs = require("fs");
const path = require("path");
const compiler = require("@vue/compiler-sfc");
const t = require("@babel/types");
const generator = require("@babel/generator").default;

const fielPath = path.resolve(__dirname, "../lib/sf/src/widgets/sf-object.vue");
const str = fs.readFileSync(fielPath, { encoding: "utf-8" });

const descriptor = compiler.parse(str).descriptor;

const program = t.program(compiler.compileScript(descriptor).scriptAst);
traverse(program, {
  noScope: true,
  ImportDeclaration(path) {
    if (
      path.node.source.value === "../../" &&
      path.node.specifiers.length === 1 &&
      path.node.specifiers[0].imported.name === "resetData"
    ) {
      path.node.source.value = "@blazes/abc/lib/sf";
    }
  },
});

const generatorScript = generator(program).code;
const resultCode =
  "<template>" +
  descriptor.template.content +
  "\n</template>" +
  `\n<script lang="ts">\n` +
  generatorScript +
  "\n</script>" +
  `\n<style scoped lang="less">` +
  descriptor.styles.map((s) => s.content).join("") +
  "\n</style>";

fs.writeFileSync(fielPath, resultCode);
