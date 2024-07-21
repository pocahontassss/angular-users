import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { UsersApiService } from '../services/usersApi.service';
import { User } from '../interfaces/interface';
import { loadUser, loadUserFailure, loadUserSuccess } from './user.action';

export const loadUsers = createEffect(
  () => {
    const actions$ = inject(Actions);
    const usersServiceApi = inject(UsersApiService);

    return actions$.pipe(
      ofType(loadUser),
      switchMap(() =>
        usersServiceApi.getUsers().pipe(
          map((user: User[]) => loadUserSuccess({ user: user })),
          catchError(error => {
            return of(loadUserFailure({ error: error.message }));
          }),
        ),
      ),
    );
  },
  { functional: true },
);
