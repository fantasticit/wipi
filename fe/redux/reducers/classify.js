import ArticleService from '../../service/article'

const initialState = {
  classifies: [],
  selectedClassify: { title: '全部', value: '', },
}

const setClassifies = data => ({
  type: 'FETCH_CLASSIFIES',
  data,
})

export const changeClassify = (classify) => {
  return {
    type: 'CHANGE_CLASSIFY',
    classify
  }
}

export const fecthClassifies = () => async (dispatch, getStats) => {
  console.log(2)
  try {
    console.log(3)
    const data = await ArticleService.fetchArticleClassifies()
    console.log(data)
    await dispatch(setClassifies(data)) 
  } catch (err) {
    console.log('获取文章分类失败')
  }
}

export const classify = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_CLASSIFIES":
      return {
        ...state,
        classifies: [{ title: '全部', value: '' }, ...action.data]
      }
    
    case 'CHANGE_CLASSIFY':
      let newState = { ...state }
      newState.selectedClassify = action.classify
      return newState

    default:
      return state
  }
}
