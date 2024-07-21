import { createFeatureSelector, createSelector } from '@ngrx/store';
import { usersKey, userState } from './user.reducer';

export const getUserState = createFeatureSelector<userState>(usersKey);

export const selectUsers = createSelector(
  getUserState,
  (state: userState) => state.users,
);

export const selectUserError = createSelector(
  getUserState,
  (state: userState) => state.error,
);
