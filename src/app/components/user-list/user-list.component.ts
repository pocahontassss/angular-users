import { Component, inject } from '@angular/core';
import { UserCardComponent } from '../user-card/user-card.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';
import { User } from '../../interfaces/interface';
import { userActions } from '../../+state/user.action';
import { Store } from '@ngrx/store';
import { selectUsers } from '../../+state/user.selector';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserCardComponent, AsyncPipe, CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  private readonly store = inject(Store);
  private readonly dialog = inject(MatDialog);
  public readonly users$ = this.store.select(selectUsers);

  ngOnInit() {
    this.store.dispatch(userActions.loadUser());
  }

  deleteUser(id: number) {
    this.store.dispatch(userActions.deleteUser({ id }));
  }

  openDialog(user?: User): void {
    let isEdit: boolean = false;
    if (user) {
      isEdit = true;
    }

    const dialogRef = this.dialog.open<
      CreateEditUserComponent,
      { isEdit: boolean; user?: User }
    >(CreateEditUserComponent, {
      data: {
        isEdit,
        user: user,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (isEdit && result) {
        this.store.dispatch(
          userActions.editUser({ user: { ...user, ...result } }),
        );
      } else if (isEdit == false && result) {
        this.store.dispatch(
          userActions.addUser({ user: { ...user, ...result } }),
        );
      }
    });
  }
}
