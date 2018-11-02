const fs = require('fs');
const path = require('path');
const packageJson = require('../package.json');

let filePath = path.resolve('build/index.html');
let html = fs.readFileSync(filePath, 'utf8');
html = html.replace('<head>', `<head><base href="${packageJson.homepage}">`);
fs.writeFileSync(path.resolve('build/index.html'), html);
