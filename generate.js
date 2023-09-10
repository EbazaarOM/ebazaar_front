const fs = require('fs');

const myArgs = process.argv.slice(2);

const path = myArgs[0];
const componentName = myArgs[1];

if (!path) throw new Error('Path is not provided!');
if (!componentName) throw new Error('Component name is not provided!');

const fullPath = `${path}/${componentName}`;

const getExportTemplate = (name) => `export { default as ${name} } from './${name}';\n`;

const getComponentTemplate = (name) => `const ${name} = () => {};\n\nexport default ${name};\n`;

if (!fs.existsSync(fullPath)) {
  fs.mkdirSync(fullPath, { recursive: true });

  fs.appendFile(`${fullPath}/index.js`, getExportTemplate(componentName), (err) => {
    if (err) throw err;
    console.log(`Created ${fullPath}/index.js`);
  });

  fs.appendFile(`${fullPath}/${componentName}.js`, getComponentTemplate(componentName), (err) => {
    if (err) throw err;
    console.log(`Created ${fullPath}/${componentName}.js`);
  });
} else {
  throw new Error('Component exists!');
}
