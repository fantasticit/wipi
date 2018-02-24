import { ArticleProvider } from '@/provider/article-provider'

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
  tags: [{ value: '草稿', title: '草稿' },]
}

const actions = {
  async getTags({ commit }) {
    console.log('获取')
    const tags = await ArticleProvider.getTags()
    console.log(tags)

    commit('SET_TAGS', tags)
  },
}

const mutations = {
  SET_TAGS(state, tags) {
    state.tags = tags
    console.log(tags)
  }
}

export default {
  state,
  actions,
  mutations,
}
