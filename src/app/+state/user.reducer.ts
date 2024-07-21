import { createFeature, createReducer, on } from '@ngrx/store';
import { userActions } from './user.action';
import { User } from '../interfaces/interface';

export interface userState {
  users: User[];
  error: string | null;
  loading: boolean;
}

export const initialState: userState = {
  users: [],
  error: null,
  loading: false,
};

export const usersKey = 'users';
export const userReducer = createFeature({
  name: usersKey,
  reducer: createReducer(
    initialState,
    on(userActions.loadUser, state => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(userActions.loadUserSuccess, (state, { user }) => ({
      ...state,
      users: user,
      loading: false,
      error: null,
    })),
    on(userActions.loadUserFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error: error,
    })),
    on(userActions.deleteUser, (state, { id }) => ({
      ...state,
      users: state.users.filter(user => user.id !== id),
      loading: false,
      error: null,
    })),
    on(userActions.addUser, (state, { user }) => ({
      ...state,
      users: [...state.users, user],
      loading: false,
      error: null,
    })),
    on(userActions.editUser, (state, { user }) => ({
      ...state,
      users: state.users.map(data => {
        return data.id === user.id ? user : data;
      }),
      loading: false,
      error: null,
    })),
  ),
});
