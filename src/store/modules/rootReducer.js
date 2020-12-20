import { combineReducers } from 'redux';
import auth from './auth/reducer';
import image from './image/reducer';
import user from './user/reducer';

export default combineReducers({auth, image, user});
