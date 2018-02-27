import { combineReducers } from 'redux'
import { author } from './author'
import { classify } from './classify'

export const reducers = combineReducers({
  author,
  classify
})
