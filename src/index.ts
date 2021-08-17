#! /usr/bin/env node

import { program } from 'commander';
import { resolve } from 'path';
import { sync } from 'globby';
import slash from 'slash';
import { readFileSync, writeFileSync } from 'fs';
import { transToCSS } from './util';

program.version('0.0.1').option('-o, --out <path>', 'output root path').option('-v, --verbose', 'output logs');

program.on('--help', () => {
  console.log(`
  You can add the following commands to npm scripts:
 ------------------------------------------------------
  "compile": "tsccss -o dist"
 ------------------------------------------------------
`);
});

program.parse(process.argv);

const { out } = program.opts() as {
  out?: string;
  verbose?: boolean;
};

if (!out) {
  throw new Error('--out must be specified');
}

const outRoot = resolve(process.cwd(), out);

console.log(`tsccss --out ${outRoot}`);

// Read output files
const findPath = slash(`${outRoot}/**/!(*.d).{ts,tsx,js,jsx}`);
const files = sync(findPath, { dot: true }).map((x) => resolve(x));

let changedFileCount = 0;
let transToCSSCount = 0;
const filesLen = files.length;

for (let i = 0; i < filesLen; i += 1) {
  const file = files[i];
  const content = readFileSync(file, 'utf-8');
  const res = transToCSS(content);
  if (res) {
    const { count: changeCount, content: changeContent } = res;
    if (changeCount > 0) {
      changedFileCount += 1;
      transToCSSCount += changeCount;
      console.log(`${file}: replaced ${changeCount} style suffixes with css.`);
      writeFileSync(file, changeContent, 'utf8');
    }
  }
}

console.log(`Replaced ${transToCSSCount} styles with suffix css in ${changedFileCount} files`);
