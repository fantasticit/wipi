import { ArticleProvider } from '@/provider/article-provider'
import { ClassifyProvider } from '@/provider/classify-provider'
import { TagProvider } from '@/provider/tag-provider'

const state = {
  classifies: [],                     // 文章分类
  tags: [],
  states: [
    { value: 'draft', title: '草稿' }, 
    { value: 'publish', title: '发布' },
  ],                     // 文章状态
  coverPrefix: 'http://p39p1kvxn.bkt.clouddn.com/', // 上传图片网址前缀
}

const actions = {
  async getTags({ commit }) {
    const tags = await TagProvider.getTags()

    commit('SET_TAGS', tags)
  },

  async getClassifies({ commit }) {
    const classifies = await ClassifyProvider.getClassifies()

    commit('SET_CLASSIFIES', classifies)
  },
}

const mutations = {
  SET_TAGS(state, tags) {
    state.tags = tags
  },

  SET_CLASSIFIES(state, classifies) {
    console.log(classifies)
    state.classifies = classifies

    console.log(state.classifies)
  }
}

export default {
  state,
  actions,
  mutations,
}
