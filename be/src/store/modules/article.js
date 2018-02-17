const state = {
  classifies: [
    {
      value: '前端',
      title: '前端',
    },
    {
      value: '后端',
      title: '后端',
    },
    // {
    //   value: 'design',
    //   title: '设计',
    // },
    // {
    //   value: 'algorithm',
    //   title: '算法',
    // },
    // {
    //   value: 'data_structor',
    //   title: '数据结构',
    // },
    // {
    //   value: 'ai',
    //   title: '人工智能',
    // },
    // {
    //   value: 'other',
    //   title: '其他',
    // },
  ],                     // 文章分类
  states: [
    { value: '草稿', title: '草稿' }, 
    { value: '发布', title: '发布' },
  ],                     // 文章状态
  coverPrefix: 'http://p39p1kvxn.bkt.clouddn.com/', // 上传图片网址前缀
}

export default {
  state,
}
