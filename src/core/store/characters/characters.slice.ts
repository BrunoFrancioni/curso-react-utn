import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Character } from "../../models/CharacterModel";

interface CharactersState {
    characters: Character[];
    totalResults: number;
    actualPage: number;
    favorites: Character[];
}

interface interactCharacters {
    characters: Character[];
}

interface InteractTotalResults {
    totalResults: number;
}

interface InteractActualPage {
    actualPage: number;
}

interface InteractFavorites {
    favorites: Character[];
}

const initialState: CharactersState = {
    characters: [],
    totalResults: 0,
    actualPage: 1,
    favorites: []
}

export const charactersSlice = createSlice({
    name: 'characters',
    initialState: initialState,
    reducers: {
        setCharacters: (state: CharactersState, action: PayloadAction<interactCharacters>) => {
            state.characters = action.payload.characters;
        },
        changeTotalResults: (state: CharactersState, action: PayloadAction<InteractTotalResults>) => {
            state.totalResults = action.payload.totalResults;
        },
        changeActualPage: (state: CharactersState, action: PayloadAction<InteractActualPage>) => {
            state.actualPage = action.payload.actualPage;
        },
        setFavorites: (state: CharactersState, action: PayloadAction<InteractFavorites>) => {
            state.favorites = action.payload.favorites;
        }
    }
});

export const {
    actions: {
        setCharacters: setCharactersAction,
        changeTotalResults: changeTotalResultsAction,
        changeActualPage: changeActualPageAction,
        setFavorites: setFavoritesAction
    }
} = charactersSlice;