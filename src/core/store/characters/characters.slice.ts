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

interface InteractFavorite {
    character: Character;
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
            state.characters = action.payload.characters
        },
        changeTotalResults: (state: CharactersState, action: PayloadAction<InteractTotalResults>) => {
            state.totalResults = action.payload.totalResults
        },
        changeActualPage: (state: CharactersState, action: PayloadAction<InteractActualPage>) => {
            state.actualPage = action.payload.actualPage
        },
        addFavorite: (state: CharactersState, action: PayloadAction<InteractFavorite>) => {
            state.favorites.push(action.payload.character)
        },
        removeFavorite: (state: CharactersState, action: PayloadAction<InteractFavorite>) => {
            state.favorites = state.favorites.filter((x: Character) => x.id !== action.payload.character.id)
        }
    }
});

export const {
    actions: {
        setCharacters: setCharactersAction,
        changeTotalResults: changeTotalResultsAction,
        changeActualPage: changeActualPageAction,
        addFavorite: addFavoriteAction,
        removeFavorite: removerFavoriteAction
    }
} = charactersSlice;