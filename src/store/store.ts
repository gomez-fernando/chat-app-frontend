import { configureStore } from "@reduxjs/toolkit";
import { iUser, iStore, iRoom } from "../interfaces/interfaces";
import { groupRoomReducer } from "../reducers/group-room/reducer";
import { loggedUserReducer } from "../reducers/logged-user/reducer";
import { roomReducer } from "../reducers/room/reducer";
import { userReducer } from "../reducers/user/reducer";
import { emptyUser } from "../utils/mocks";

const preloadedState: iStore = {
    user: emptyUser,
    users: [] as iUser[],
    rooms: [] as iRoom[],
    groupRoom: [] as string[],
}

export const store = configureStore({
    reducer: {user: loggedUserReducer, users: userReducer, rooms: roomReducer, groupRoom: groupRoomReducer},
    preloadedState
});