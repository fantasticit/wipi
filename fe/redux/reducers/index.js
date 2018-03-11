import { combineReducers } from 'redux'
import { author } from './author'
import { tags } from './tags'

export const reducers = combineReducers({
  author,
  tags,
})
