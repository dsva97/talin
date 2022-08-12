import esbuild from "esbuild";
import fs from "fs";
import path from "path";
import ReactDOM from "react-dom/server";
import { ROOT_DIR } from "../config";

const getInitialScript = (Cmp: Function, props: Object) => {
  const nameCmp = Cmp.name;
  props = JSON.stringify(props);
  return `
    import React from 'react'
    import ReactDOM from 'react-dom'
    import { ${nameCmp} } from './src/components/${nameCmp}'

    const root = document.getElementById('root')

    const props = ${props}

    ReactDOM.hydrate(
      <${nameCmp} {...props} />,
      root
    )
  `;
};

const getInitialHtml = () => /*html*/ `
<!DOCTYPE html>
<html lang="en">
<head>
</head>
<body>
  <div id='root'></div>
</body>
</html>
`;

const getBundleScript = (Cmp: Function, props: Object) => {
  const contents = getInitialScript(Cmp, props);

  const now = new Date().getTime();
  const fileName = now + ".js";
  const outfilePath = path.join(__dirname, "tmp", fileName);

  esbuild.buildSync({
    stdin: {
      contents,
      // These are all optional:
      resolveDir: ROOT_DIR,
      sourcefile: "imaginary-file.ts",
      loader: "tsx",
    },
    platform: "browser",
    external: ["electron/renderer"],
    minify: false,
    bundle: true,
    sourcemap: "inline",
    outfile: outfilePath,
  });

  const script = fs.readFileSync(outfilePath, "utf-8");

  fs.rmSync(outfilePath);

  return script;
};

export const getHtmlCmp = (Cmp: Function, props: Object) => {
  const now = new Date().getTime();
  const fileName = now + ".html";
  const pathFile = path.join(__dirname, "tmp", fileName);

  const initHtml = getInitialHtml();
  const script = getBundleScript(Cmp, props);

  const cmpHtml = ReactDOM.renderToString(<Cmp {...props} />);

  const finalHtml = initHtml.replace(
    "<div id='root'></div>",
    `<div id='root'>${cmpHtml}</div><script>${script}</script> `
  );

  fs.writeFileSync(pathFile, finalHtml);

  return { path: pathFile, cleanFile: () => fs.rmSync(pathFile) };
};
