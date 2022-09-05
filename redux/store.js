import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import vehicleReducer from "./vehicleReducer";
import userReducer from "./userReducer";
import commentReducer from "./commentReducer";

const persistConfig = { 
    key: 'root', 
    blacklist: ['vehicleReducer', 'commentReducer'],
    storage 
};

const rootReducer = combineReducers({vehicleReducer, commentReducer, userReducer});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware()));
export const persistor = persistStore(store);
