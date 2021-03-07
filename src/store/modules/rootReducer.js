import { combineReducers } from 'redux';
import auth from './auth/reducer';
import image from './image/reducer';
import phonenumber from './phonenumber/reducer';
import task from './task/reducer';
import user from './user/reducer';

export default combineReducers({auth, image, phonenumber, task, user});
