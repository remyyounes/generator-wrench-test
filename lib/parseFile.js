const fs = require('fs');
const R = require('ramda');

const forbiddenPatterns = [
  /.*\.[^\/]+.*/,
  /.*node_modules.*/,
];
function isRestricted(file) {
  const checks = forbiddenPatterns.map( (forbidden) => {
    const reg = new RegExp(forbidden);
    return file.match(reg, 'g');
  });
  const fails = checks.filter( forbidden => forbidden );
  return fails.length > 0;
}

function isDir(file) {
  const dir = fs.statSync(file).isDirectory();
  return dir && !isRestricted(file);
}

function isJs(file) {
  const js = file.match(/.*(\.js)$/);
  return js && fs.statSync(file).isFile();
}

function needsTest(file) {
  return true;
}

function prependPath(path) {
  return file => `${path}/${file}`;
}

function parseDir(dir) {
  const files = fs.readdirSync(dir).map(prependPath(dir));
  const dirs = files.filter(isDir);
  const nestedJs = R.chain(parseDir)(dirs);
  const js = files.filter(isJs).filter(needsTest);
  return js.concat(nestedJs);
}

const hits = parseDir('.');

console.log(hits);
