const marked = require('marked')
const renderer = new marked.Renderer()

renderer.heading = function (text, level) {
  const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-')

  return  
    `
    <h${level}>
      <a name="${escapedText}" href="#${escapedText}">
        <span class="header-link"></span>
      </a>
      ${text}
    </h${level}>
    `
}

marked.setOptions({
  renderer: renderer,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
})

module.exports = marked
