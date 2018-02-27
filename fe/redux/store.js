import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { reducers } from './reducers/index'

export const initStore = (initialState = initialState) => {
  return createStore(reducers, initialState, applyMiddleware(thunkMiddleware))
}
