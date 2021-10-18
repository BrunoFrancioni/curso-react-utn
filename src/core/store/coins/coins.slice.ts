import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coin } from "../../models/CoinModel";

interface CoinsState {
    favorites: Coin[];
    totalResults: number;
    actualPage: number;
}

interface InteractFavorite {
    coin: Coin;
}

interface InteractTotalResults {
    totalResults: number;
}

interface InteractActualPage {
    actualPage: number;
}

const initialState: CoinsState = {
    favorites: [],
    totalResults: 0,
    actualPage: 1
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
        },
        changeTotalResults: (state: CoinsState, action: PayloadAction<InteractTotalResults>) => {
            state.totalResults = action.payload.totalResults
        },
        changeActualPage: (state: CoinsState, action: PayloadAction<InteractActualPage>) => {
            state.actualPage = action.payload.actualPage
        }
    }
});

export const {
    actions: {
        addFavorite: addFavoriteAction,
        removeFavorite: removerFavoriteAction,
        changeTotalResults: changeTotalResultsAction,
        changeActualPage: changeActualPageAction
    }
} = coinsSlice;