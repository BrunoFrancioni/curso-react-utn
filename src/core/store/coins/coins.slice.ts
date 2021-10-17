import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coin } from "../../models/CoinModel";

interface CoinsState {
    favorites: Coin[];
}

interface InteractFavorite {
    coin: Coin;
}

const initialState: CoinsState = {
    favorites: []
}

export const coinsSlice = createSlice({
    name: 'coins',
    initialState: initialState,
    reducers: {
        addFavorite: (state: CoinsState, action: PayloadAction<InteractFavorite>) => {
            state.favorites.push(action.payload.coin)
        },
        removeFavorite: (state: CoinsState, action: PayloadAction<InteractFavorite>) => {
            state.favorites = state.favorites.filter((x: Coin) => x.id !== action.payload.coin.id)
        }
    }
});

export const {
    actions: {
        addFavorite: addFavoriteAction,
        removeFavorite: removerFavoriteAction
    }
} = coinsSlice;