# tsccss ![npm](https://img.shields.io/npm/v/tsccss?style=flat-square) ![npm](https://img.shields.io/npm/dy/tsccss?style=flat-square)

As we all know, Typescript compiler does not process `.scss` or `.less` files when compiling `.ts` files, we usually use [node-sass](https://github.com/sass/node-sass#command-line-interface) or [less](http://lesscss.org/usage/#command-line-usage) to process them. But in our compiled `.js` files the style file suffixes are not changed, `tsccss` can help you change them all to `.css` suffixes without worrying about replacing them in other places you don't want to, this tool is based on [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree), not [Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions).

<div align=center><img src="/screenshot.png"/></div>

## Getting Started

First, install `tsccss` as `devDependency` using npm or yarn.

```sh
npm install tsccss --save-dev
# or
yarn add tsccss -D
```

## Add it to your build scripts in package.json

```json
"scripts": {
  "build": "tsc -p tsconfig.json && tsccss -o ./out",
}
```

### Options

| flag     | description                                          |
| -------- | ---------------------------------------------------- |
| -o --out | output directory of transpiled code (`tsc --outDir`) |

You need to provide `-o (--out)`, this is the root folder where you need to do the style suffix replacement.

### License

[MIT](/LICENSE)
