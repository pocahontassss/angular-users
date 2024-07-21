import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../interfaces/interface';

export const userActions = createActionGroup({
  source: 'User',
  events: {
    loadUser: emptyProps,
    loadUserSuccess: props<{ user: User[] }>(),
    loadUserFailure: props<{ error: string }>(),
    deleteUser: props<{ id: number }>(),
    addUser: props<{ user: User }>(),
    editUser: props<{ user: User }>(),
  },
});


export const { loadUser, loadUserFailure, loadUserSuccess } = userActions