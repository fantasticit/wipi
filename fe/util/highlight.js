const hljs = require('highlightjs')

export function highlight(node) {
  const blocks = node.querySelectorAll('pre code')

  blocks.forEach(block => hljs.highlightBlock(block))
}
