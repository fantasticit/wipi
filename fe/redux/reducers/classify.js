import ArticleService from '../../service/article'

const initialState = {
  classifies: [],
  selectedClassify: { title: '前端', value: '前端', },
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
  console.log('fecth')

  try {
    const data = await ArticleService.fetchArticleClassifies()
    await dispatch(setClassifies(data)) 
  } catch (err) {
    console.log('获取文章分类失败')
  }
}

export const classify = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_CLASSIFIES":
      console.log(action.data)
      console.log({
        ...state,
        classifies: action.data
      })
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
