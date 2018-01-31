## Markdown 编辑器
这里使用了开源库`simplemde`,使用方法可以从github搜索.此外,markdown转html使用了开源库`showdown`,使用方法也很简单:

```
import('showdown').then(showdown => {
  const convert = new showdown.Converter()
  const html = convert.makeHtml(this.article)
  return html
})
```