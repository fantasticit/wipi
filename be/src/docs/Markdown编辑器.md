## Markdown 编辑器
这里使用了开源库`simplemde`,使用方法可以从github搜索.此外,markdown转html使用了开源库`showdown`,使用方法也很简单:

```
import('showdown').then(showdown => {
  const convert = new showdown.Converter()
  const html = convert.makeHtml(this.article)
  return html
})
```

## 其他文档
- [表单验证](https://github.com/mvpzx/elapse/blob/master/be/src/docs/%E8%A1%A8%E5%8D%95%E9%AA%8C%E8%AF%81.md)
- [网页全屏](https://github.com/mvpzx/elapse/blob/master/be/src/docs/%E7%BD%91%E9%A1%B5%E5%85%A8%E5%B1%8F.md)
- [上传组件](https://github.com/mvpzx/elapse/blob/master/be/src/docs/上传组件.md)
