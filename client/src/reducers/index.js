import { combineReducers } from "redux";

import feedback from "./feedback";
import auth from './auth'

export default combineReducers({
  feedback,
  auth
});
