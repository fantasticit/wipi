import { createStore, applyMiddleware } from 'redux'
import ArticleService from '../service/article'
import thunkMiddleware from 'redux-thunk'

const initialState = {
  classifies: [],
  selectedClassify: { title: '前端', value: '前端', },
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_CLASSIFIES":
      return {
        ...state,
        classifies: action.data
      }
    
    case 'CHANGE_CLASSIFY':
      let newState = { ...state }
      newState.selectedClassify = action.classify
      return newState

    default:
      return state
  }
}

const setClassifies = data => ({
  type: 'FETCH_CLASSIFIES',
  data,
})

export const changeClassify = (classify) => ({
  type: 'CHANGE_CLASSIFY',
  classify
})

export const fecthClassifies = () => async (dispatch, getStats) => {
  console.log('调用嗯')
  try {
    const data = await ArticleService.fetchArticleClassifies()
    await dispatch(setClassifies(data)) 
  } catch (err) {
    console.log('获取文章分类失败')
  }
}

export const initStore = (initialState = initialState) => {
  return createStore(reducer, initialState, applyMiddleware(thunkMiddleware))
}
