import { createReducer } from "@reduxjs/toolkit";
import { iUser } from "../../interfaces/interfaces";
import * as actions from './action.creators'


const initialState = {};

export const loggedUserReducer = createReducer(initialState, (builder) =>  builder
    .addCase(actions.loadLoggedUsersAction, (_state, action) => 
        action.payload
    )
    .addCase(actions.deleteLoggedUserAction, (state, action) => 
        {}
    )
    .addDefaultCase(state => state)
);