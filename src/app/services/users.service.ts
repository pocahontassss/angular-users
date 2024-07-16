import { Injectable, inject } from '@angular/core';
import { User } from '../interfaces/interface';
import { UsersApiService } from './usersApi.service';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  usersApiService = inject(UsersApiService);
  localStorage = inject(LocalStorageService)
  private userSubject$ = new BehaviorSubject<User[]>([]);
  public readonly users$ = this.userSubject$.asObservable();

  loadUsers() {
    const localStorageUsers = this.localStorage.getUsersFromLocalStorage('users')
    
    if (localStorageUsers) {
      this.userSubject$.next(localStorageUsers);
    } else {
      this.usersApiService.getUsers().subscribe(data => {
      this.localStorage.saveUsersToLocalStorage('users', data);
      this.userSubject$.next(data);
      })
    };
  }

  deleteUser(id: number) {
    const findUser = this.userSubject$.value.find(user => user.id === id);
    const deleteUser = this.userSubject$.value.filter(user => user.id !== id)
    
    if (findUser && confirm('Вы точно хотите удалить карточку пользователя ' + findUser.name + '?')) {
        this.localStorage.saveUsersToLocalStorage('users', deleteUser);
        this.userSubject$.next(deleteUser);
    }
  }

  addUser(user: User) {
    const newUser = [...this.userSubject$.value, user]
    this.localStorage.saveUsersToLocalStorage('users', newUser);
    this.userSubject$.next(newUser);
  }

  editUser(user: User) {
    const index = this.userSubject$.value.findIndex(u => u.id === user.id);
    this.userSubject$.value[index] = user;
    this.localStorage.saveUsersToLocalStorage('users', this.userSubject$.value);
    this.userSubject$.next(this.userSubject$.value);
  }
}

