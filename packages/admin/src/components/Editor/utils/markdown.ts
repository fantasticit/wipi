import * as Showdown from 'showdown';

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
  emoji: true,
  smoothLivePreview: true,
  simpleLineBreaks: true,
  underline: true,
  parseImgDimensions: true,
  rawHeaderId: true,
});

export const makeHtml = (value) => {
  return converter.makeHtml(value);
};

export function makeToc(text) {
  let toc;
  let lines = text
    .replace(/^```[\W\w]+?^```/gm, '')
    .replace(/<!-- omit in (toc|TOC) -->/g, '&lt; omit in toc &gt;')
    .replace(/<!--[\W\w]+?-->/, '')
    .replace(/^---[\W\w]+?(\r?\n)---/, '')
    .split(/\r?\n/g);

  lines.forEach((lineText, i, arr) => {
    if (
      i < arr.length - 1 &&
      lineText.match(/^ {0,3}\S.*$/) &&
      arr[i + 1].match(/^ {0,3}(=+|-{2,}) *$/)
    ) {
      arr[i] = (arr[i + 1].includes('=') ? '# ' : '## ') + lineText;
    }
  });
  toc = lines
    .filter((lineText) => {
      return (
        lineText.startsWith('#') &&
        lineText.includes('# ') &&
        !lineText.includes('&lt; omit in toc &gt;')
      );
    })
    .map((lineText) => {
      let matches = /^(#+) (.*)/.exec(lineText);
      return { level: matches[1].length, text: matches[2].replace(/#+$/, '').trim() };
    });
  return toc;
}
