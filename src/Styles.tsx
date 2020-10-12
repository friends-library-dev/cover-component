import React from 'react';
import * as css from './css';

const CoverWebStylesAllStatic: React.FC = () => (
  <style className="cover-styles-static">{minifyCss(css.allStatic())}</style>
);

const CoverWebStylesSizes: React.FC = () => (
  <style className="cover-styles-dynamic">{minifyCss(css.allDynamic())}</style>
);

export { CoverWebStylesAllStatic, CoverWebStylesSizes };

function minifyCss(css: string): string {
  return css
    .replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, ``)
    .replace(/ {2,}/g, ` `)
    .replace(/ ([{:}]) /g, `$1`)
    .replace(/([;,]) /g, `$1`)
    .replace(/ !/g, `!`);
}
