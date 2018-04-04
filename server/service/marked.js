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
    var anchor = text.toLowerCase().replace(/\s+/g, '-')
    toc.push({
      level: level,
      anchor: pinyin(anchor, {
        style: pinyin.STYLE_INITIALS, // 设置拼音风格 
        heteronym: true
      }),
      title: text
    })
    return `<h${level}><a href='#${anchor}' id='${anchor}' class='anchor'></a><a href='#${anchor}'>${text}</a></h${level}>`
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
