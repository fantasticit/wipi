const marked = require('marked');
const Hljs = require('highlight.js/lib/highlight');

Hljs.registerLanguage('go', require('highlight.js/lib/languages/go'));
Hljs.registerLanguage('css', require('highlight.js/lib/languages/css'));
Hljs.registerLanguage('sql', require('highlight.js/lib/languages/sql'));
Hljs.registerLanguage('php', require('highlight.js/lib/languages/php'));
Hljs.registerLanguage('html', require('highlight.js/lib/languages/htmlbars'));
Hljs.registerLanguage('json', require('highlight.js/lib/languages/json'));
Hljs.registerLanguage('bash', require('highlight.js/lib/languages/bash'));
Hljs.registerLanguage('less', require('highlight.js/lib/languages/less'));
Hljs.registerLanguage('scss', require('highlight.js/lib/languages/scss'));
Hljs.registerLanguage('shell', require('highlight.js/lib/languages/shell'));
Hljs.registerLanguage('nginx', require('highlight.js/lib/languages/nginx'));
Hljs.registerLanguage('stylus', require('highlight.js/lib/languages/stylus'));
Hljs.registerLanguage('python', require('highlight.js/lib/languages/python'));
Hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));
Hljs.registerLanguage('typescript', require('highlight.js/lib/languages/typescript'));

const renderer = new marked.Renderer();

marked.setOptions({
  renderer,
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight(code) {
    return Hljs.highlightAuto(code).value;
  }
});

// 段落解析
const paragraphParse = text => {
  const textIsImage = text.includes('<img');
  if (textIsImage) return `<div class="image-package">${text}</div>`;
  return `<p>${text}</p>`;
};

// 对图片进行弹窗处理, 及懒加载处理
const imageParse = (src, title, alt) => {
  return `<img
            src="${src}"
            title="${title || alt || ''}"
            data-src="${src}"
            class="img-pop"/>
          <div class="img-caption">${title || alt || ''}</div>
          `;
};

// 外链
const linkParse = (href, title, text) => {
  return `<a href="${href}"
             target="_blank" >
             ${text.length > 20 ? text.slice(0, 20) + '...' : text}
          </a>`
    .replace(/\s+/g, ' ')
    .replace('\n', '');
};

renderer.link = linkParse;
renderer.paragraph = paragraphParse;
renderer.image = imageParse;

module.exports =  (content, tags, parseHtml = false) => {
  if (typeof content !== 'string') {
    return '';
  }

  // 生成目录树
  var toc = [];

  const headingParse = function(text, level, raw) {
    var anchor = this.options.headerPrefix + raw.toLowerCase().replace(/[^\w]+/g, '-');
    toc.push({
      anchor: `#header-${toc.length}`,
      level: level,
      text: text
    });
    if (level >= 4 || level === 1)
      return `<h${level} id="${anchor}">${text}</h${level}>\n`;
    return `<h${level} id="header-${toc.length - 1}">${text}</h${level}>\n`;
  };

  marked.setOptions({ sanitize: !parseHtml });

  renderer.heading = headingParse;

  let html = marked(content, { renderer });

  // 返回解析内容
  return { html, toc };
};
