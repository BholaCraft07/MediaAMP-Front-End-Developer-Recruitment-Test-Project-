import { createSlice } from "@reduxjs/toolkit";

export const gameCartSlice = createSlice({
    name: "gameCartLib",
    initialState: [],
    reducers: {
        addToGameLib: (state, action) => {
            const gameId = action.payload;
            if (!state.includes(gameId)) {
                state.push(gameId);
            }
        },
        removeToGameLib: (state, action) => {
            const gameId = action.payload;
            return state.filter(id => id !== gameId);
        }
    }
})

export const { addToGameLib, removeToGameLib } = gameCartSlice.actions;
export default gameCartSlice.reducer;