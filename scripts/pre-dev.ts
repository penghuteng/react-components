import fs from "fs-extra";
import { r, log, port, isDev } from "./utils";
import chokidar from "chokidar";

async function stubIndexHtml() {
  await fs.ensureDir(r("dist"));
  let data = await fs.readFile(r(`test/index.html`), "utf-8");

  data = data
    .replace(`"./main.tsx"`, `http://localhost:${port}/main.tsx`)
    .replace(
      `<div id="app"></div>`,
      `<div id="app">Vite server did not start</div>`
    );

  data += `<style type="text/css">
      @media (prefers-color-scheme: dark){
        body {
          background: #35363A;
          color: #fff;
        }
      }
      @media (prefers-color-scheme: light){
        body {
          background: #fff;
          color: #35363A;
        }
      }
    </style>`;

  await fs.writeFile(r(`dist/index.html`), data, "utf-8");
  log("PRE", `stub dev`);
}

if (isDev) {
  stubIndexHtml();
  chokidar.watch(r("test/**/*.html")).on("change", () => {
    stubIndexHtml();
  });
}
