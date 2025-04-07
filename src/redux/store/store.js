import { configureStore } from "@reduxjs/toolkit";
import { gameApi } from "../../api/rawgApi";

import gameCartReducer from "../store/gamelib.slice";

export const store=configureStore({
    reducer:{
        [gameApi.reducerPath]:gameApi.reducer,
         gameCartLib: gameCartReducer,
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(gameApi.middleware),
})
