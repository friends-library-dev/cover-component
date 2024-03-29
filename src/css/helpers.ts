import cx from 'classnames';
import { CoverProps, PrintSize } from '@friends-library/types';
import { sizes as bookSizes, PAGES_PER_INCH } from '@friends-library/lulu';

export interface DocDims {
  width: number;
  height: number;
}

export function threeDSpineWidth(pages: number): number {
  return SPINE_PAD + pages / PAGES_PER_INCH;
}

export function pdfSpineWidth(pages: number): number {
  return pages < 32 ? 0 : threeDSpineWidth(pages);
}

export function pdfHeight(size: PrintSize): number {
  const { height } = docDims(size);
  return height + PRINT_BLEED * 2;
}

export function pdfWidth(size: PrintSize, pages: number): number {
  const { width } = docDims(size);
  return width * 2 + pdfSpineWidth(pages) + PRINT_BLEED * 2;
}

export function docDims(size: PrintSize): DocDims {
  const { width, height } = bookSizes[size].dims;
  return {
    width,
    height,
  };
}

export function allSizesDocDims(): { [k in PrintSize]: DocDims } {
  return {
    s: docDims(`s`),
    m: docDims(`m`),
    xl: docDims(`xl`),
  };
}

export function withSizes(fn: (dims: DocDims, size: PrintSize) => string): string {
  const sizes: PrintSize[] = [`s`, `m`, `xl`];
  return sizes
    .map((size) => fn(docDims(size), size).replace(/__SIZE__/g, size))
    .join(`\n`);
}

export function wrapClasses(
  {
    edition,
    lang,
    size,
    scope,
    scaler,
    showGuides,
    fauxVolumeNum,
  }: Pick<
    CoverProps,
    'edition' | 'lang' | 'size' | 'scope' | 'scaler' | 'showGuides' | 'fauxVolumeNum'
  >,
  customClasses?: string | string[] | Record<string, boolean>,
): string {
  const scale = typeof scaler === `number` ? scaler : 1;
  return cx(
    `Cover`,
    `Edition--${edition}`,
    `Lang--${lang}`,
    `trim--${size}`,
    showGuides ? `Cover--show-guides` : false,
    scope ? `Cover--scope-${scope}` : false,
    scale <= 0.5 ? `Cover--scale-s` : false,
    scale <= 0.35 ? `Cover--scale-xs` : false,
    fauxVolumeNum !== undefined && `faux-vol faux-vol--${fauxVolumeNum}`,
    customClasses,
  );
}

export function scaleCssInches(css: string, scaler?: number): string {
  if (typeof scaler !== `number`) {
    return css;
  }

  const pattern = /(\d+(?:\.\d+)?)in(?! +{)(;| |\))/g;

  return css.replace(pattern, (full, inches, after) => {
    return `${Number(inches) * scaler}in${after}`;
  });
}

export function scopeCss(css: string, scope?: string): string {
  if (!scope) {
    return css;
  }

  return css.replace(/\.Cover(?=\.| |,)/gm, `.Cover--scope-${scope}`);
}

export function dynamifyCss(css: string, scope?: string, scaler?: number): string {
  return scopeCss(scaleCssInches(css, scaler), scope);
}

export function spineAuthorDisplay(
  title: string,
  author: string,
  size: PrintSize,
  isCompilation: boolean,
): 'block' | 'none' {
  if (isCompilation) {
    return `none`;
  }

  const lastName = String(author.split(` `).pop());
  let totalChars = title.replace(/&nbsp;/g, ` `).length + lastName.length;
  const numWideLetters = (`${title}${lastName}`.match(/(W|D)/g) || []).length;
  totalChars += numWideLetters;

  if (size === `m` && totalChars >= 50) {
    return `none`;
  }

  if (size === `xl` && totalChars >= 60) {
    return `none`;
  }

  return `block`;
}

const SPINE_PAD = 0.06;
export const PRINT_BLEED = 0.125;
