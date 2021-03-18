import * as jf from 'jscodeshift';

const str = `
import React from 'react';
import classNames from './utils/classnames';
import sceneJPG from './assets/scene.jpg';
import { prefixCls } from './config';
import './QierPlayer.scss';
import './index.Less';
import './style.SCSS';

function QierPlayer() {
  const classes = classNames(\`\${prefixCls}\`, {});
  return React.createElement(
    'div',
    { className: classes },
    React.createElement('span', null, 'I am QierPlayer'),
    React.createElement('img', { src: sceneJPG, alt: '' }),
  );
}
export default QierPlayer;
`;

const root = jf(str);

root.find(jf.ImportDeclaration).forEach((path) => {
  const value = path.node?.source?.value;
  const regex = /(scss|less)('|"|`)?$/i;
  if (value && regex.test(value.toString())) {
    path.node.source.value = value.toString().replace(regex, (res, $1, $2) => {
      console.log(res, $1, $2);
      return $2 ? `css${$2}` : 'css';
    });
  }
});

console.log(root.toSource());

export default str;
