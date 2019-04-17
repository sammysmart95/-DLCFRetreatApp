import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import reducers from "./reducers";

const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
  blacklist: ["feedback"],
};

const pReducer = persistReducer(persistConfig, reducers);
const enhancer = composeWithDevTools(applyMiddleware(thunk))
export const store = createStore(pReducer, enhancer)
export const persistor = persistStore(store);
