import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

const initialState = {
  classifies: [
    { title: '全部', value: '', },
    { title: '前端', value: 'fe', },
    { title: '后端', value: 'be', },
  ],
  selectedClassify: { title: '前端', value: '前端', },
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_CLASSIFIES":
      return state.classifies
    
    case 'CHANGE_CLASSIFY':
      let newState = { ...state }
      newState.selectedClassify = action.classify
      return newState

    default:
      return state
  }
}

const fecthClassifies = (response) => ({
  type: 'FETCH_CLASSIFIES'
})

export const changeClassify = (classify) => ({
  type: 'CHANGE_CLASSIFY',
  classify
})

export const initStore = (initialState = initialState) => {
  return createStore(reducer, initialState, applyMiddleware(thunkMiddleware))
}
