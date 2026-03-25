import * as sass from 'sass';

export function compileSass(scssCode) {
  try {
    const result = sass.compileString(scssCode, {
      style: 'expanded',
    });
    return { css: result.css.trim(), error: null };
  } catch (e) {
    return { css: '', error: e.message };
  }
}

export function normalizeCss(css) {
  return css
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .replace(/;\s*}/g, ';\n}')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join('\n');
}

export function compareCss(actual, expected) {
  return normalizeCss(actual) === normalizeCss(expected);
}
