const Marked = require('marked');
const hljs = require('highlight.js');
const pinyin = require('pinyin');
const renderer = new Marked.Renderer();

Marked.setOptions({
  highlight: function(code, lang) {
    if (hljs.getLanguage(lang)) {
      return hljs.highlight(lang, code).value
    } else {
      return hljs.highlightAuto(code).value
    }
  },
  renderer
})

module.exports = content => {
  const toc = [];

  renderer.heading = function (text, level) {
    let anchor = 'heading-' + toc.length;

    toc.push({
      level: level,
      anchor: anchor,
      title: text
    })
    return `<h${level}><a name='#${anchor}' id='${anchor}' class='anchor'></a><a href='#${anchor}'>${text}</a></h${level}>`
  }

  const marked = text => {
    var tok = Marked.lexer(text);
    text = Marked.parser(tok).replace(/<pre>/ig, '<pre class="hljs">');
    return text;
  }

  let html = marked(content);

  // 返回解析内容
  return { html, toc };
}
