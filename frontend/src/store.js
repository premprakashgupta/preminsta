import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";
import { ProfileReducer, registerReducer, SuggestionReducer } from "./reducers/userReducer";
import { AllPostReducer } from "./reducers/postReducer";

const reducer = combineReducers({
  Detail: registerReducer,
  profileData: ProfileReducer,
  postStorage: AllPostReducer,
  suggestion: SuggestionReducer
});

let initialState = {};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
