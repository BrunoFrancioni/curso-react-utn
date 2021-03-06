import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { persistReducer } from 'redux-persist';
import { charactersSlice } from "./characters/characters.slice";

const reducers = combineReducers({
    reducer: charactersSlice.reducer
});

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});

type RootState = ReturnType<typeof store.getState>;

export const selectCharacters = (state: RootState) => state.reducer;

export default store;