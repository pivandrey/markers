import { combineReducers } from 'redux';
import tags from './tags';
import markers from './markers';

export const rootReducer = combineReducers({
  tags,
  markers,
});
