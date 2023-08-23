import { combineReducers } from 'redux';
import userSlice from './slice/userSlice';
import propertiesSlice from '../features/properties/propertiesSlice';

const rootReducer = combineReducers({
  user: userSlice,
  properties: propertiesSlice
  
  
  // other reducers...
});

export default rootReducer;