export const DEFAULT_MARKDOWN = `
# 欢迎使用 Wipi Markdown 编辑器

> * 整理知识，学习笔记
> * 发布日记，杂文，所见所想
> * 撰写发布技术文稿（代码支持）

## 什么是 Markdown

Markdown 是一种方便记忆、书写的纯文本标记语言，用户可以使用这些标记符号以最小的输入代价生成极富表现力的文档：譬如您正在阅读的这份文档。它使用简单的符号标记不同的标题，分割不同的段落，**粗体** 或者 *斜体* 某些文字。

### 1. 待办事宜 Todo 列表

- [ ] 支持以 PDF 格式导出文稿
- [x] 新增 Todo 列表功能

### 2. 高亮一段代码[^code]

\`\`\`python
@requires_authorization
class SomeClass:
    pass

if __name__ == '__main__':
    # A comment
    print 'hello world'
\`\`\`

### 3. 绘制表格

| 项目        | 价格   |  数量  |
| --------   | -----:  | :----:  |
| 计算机     | 1600 |   5     |
| 手机        |   12   |   12   |
| 管线        |    10    |  234  |

### 4. 嵌入网址
<iframe src="//player.bilibili.com/player.html?aid=77737877&bvid=BV1xJ411z7eS&cid=132993821&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>

\`\`\`HTML
<iframe src="//player.bilibili.com/player.html?aid=77737877&bvid=BV1xJ411z7eS&cid=132993821&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
\`\`\`
`;
