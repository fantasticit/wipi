import TagService from '../../service/tag'

const initialState = {
  tags: [],
  selectedTag: {},
}

const setTags = data => ({
  type: 'SET_TAGS',
  data,
})

export const changeTag = (tag) => {
  return {
    type: 'CHANGE_TAG',
    tag
  }
}

export const fetchTags = () => async (dispatch, getStats) => {
  try {
    const data = await TagService.fetchTags()
    await dispatch(setTags(data))
  } catch (err) {
    console.log('获取标签失败')
  }
}

export const tags = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TAGS":
      return {
        ...state,
        tags: [{ tag: { title: '全部文章', value: '' } }, ...action.data]
      }
    
    case 'CHANGE_TAG':
      let newState = { ...state }
      newState.selectedTag = action.tag
      return newState

    default:
      return state
  }
}
