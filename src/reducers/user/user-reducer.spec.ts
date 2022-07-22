import * as actions from './action.creators';
import { AnyAction } from '@reduxjs/toolkit';
import { iUser } from '../../interfaces/interfaces';
import { userReducer } from './reducer';
import { mockUsersArray } from '../../utils/mocks';


describe('Given users reducer', () => {
    describe('When calling it with load action with an array of users', () => {
        test('It should return a new state with that array of users', () => {
            const newState = userReducer(
                [],
                actions.loadUsersAction(mockUsersArray)
            );
            expect(newState).toEqual(mockUsersArray);
        });
    });
    describe('When calling it with add action with a user', () => {
        test('It should return a new state with an array with that user', () => {
            const newState = userReducer(
                [],
                actions.addUserAction(mockUsersArray[0])
            );
            expect(newState).toEqual([mockUsersArray[0]]);
        });
    });
    describe('When calling it with update action with a user or partial user', () => {
        test('It should return a new state with a updated array of users', () => {
            const newState = userReducer(
                mockUsersArray,
                actions.updateUserAction({
                    ...mockUsersArray[0],
                    name: 'true',
                })
            );
            expect(newState.find((item) => item._id === '1')?.name).toBe(
                'true'
            );
        });
    });
    describe('When calling it with delete action with a user', () => {
        test('It should return a new state with an array of previous users without the deleted one', () => {
            const newState = userReducer(
                mockUsersArray,
                actions.deleteUserAction(mockUsersArray[0])
            );
            expect(newState).toEqual([mockUsersArray[1]]);
        });
    });
    describe('When calling it with a non related action', () => {
        test('It should return a new state equal to the previous one', () => {
            const newState = userReducer(mockUsersArray, {} as AnyAction);
            expect(newState).toEqual(mockUsersArray);
        });
    });
});
