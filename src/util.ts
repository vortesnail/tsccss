import jf from 'jscodeshift';

/**
 * Based on AST, replace the style suffix in the read file content with CSS.
 * @param str File content string
 * @returns Quantity replaced
 */
function transToCSS(str: string) {
  const root = jf(str);
  let count = 0;
  root.find(jf.ImportDeclaration).forEach((path) => {
    const value = path.node?.source?.value;
    const regex = /(scss|less)('|"|`)?$/i;
    if (value && regex.test(value.toString())) {
      count += 1;
      path.node.source.value = value.toString().replace(regex, (_res, _$1, $2) => ($2 ? `css${$2}` : 'css'));
    }
  });

  return {
    content: root.toSource(),
    count,
  };
}

export { transToCSS };
