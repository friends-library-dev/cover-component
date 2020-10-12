import css from 'x-syntax';
import { Css } from '@friends-library/types';
import common from './common';
import front from './front';
import back from './back';
import spine from './spine';
import threeD from './3d';

export default function allDynamic(): Css {
  const sizes: [number, string][] = [
    [1, `full`],
    [3 / 5, `3-5`],
    [4 / 5, `4-5`],
    [1 / 2, `1-2`],
    [1 / 3, `1-3`],
    [1 / 4, `1-4`],
  ];
  return (
    sizes
      .map(([scaler, scope]) =>
        [
          common(scaler, scope)[1],
          front(scaler, scope)[1],
          back(scaler, scope)[1],
          spine(scaler, scope)[1],
          threeD(scaler, scope)[1],
        ].join(`\n`),
      )
      .join(`\n`) +
    css`
      .Cover.Cover--3d.Cover--scope-3-5 {
        perspective: 1200px;
      }
      .Cover.Cover--3d.Cover--scope-1-2 {
        perspective: 1000px;
      }
      .Cover.Cover--3d.Cover--scope-1-3 {
        perspective: 800px;
      }
      .Cover.Cover--3d.Cover--scope-1-4 {
        perspective: 600px;
      }
    `
  );
}
