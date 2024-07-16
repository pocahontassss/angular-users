import { Component, inject } from '@angular/core';
import { UserCardComponent } from '../user-card/user-card.component';
import { UsersService } from '../../services/users.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';
import { User } from '../../interfaces/interface';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserCardComponent, AsyncPipe, CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})

export class UserListComponent {
  readonly usersService = inject(UsersService);
  public readonly users$ = this.usersService.users$;
  private readonly dialog = inject(MatDialog);

  ngOnInit() {
    this.usersService.loadUsers();
  }

  deleteUser(id: number) {
    this.usersService.deleteUser(id);
  }

  openDialog(user?: User): void {
    let isEdit: boolean = false;
    if (user) {
      isEdit = true;
    }
    
    const dialogRef = this.dialog.open<CreateEditUserComponent, {isEdit: boolean, user?: User}>(CreateEditUserComponent, {
      data: { 
        isEdit,
        user: user},
    });
    
    dialogRef.afterClosed().subscribe((result) => {
      if (isEdit && result) {
        this.usersService.editUser(result);
      }
      else if (isEdit == false && result){
        this.usersService.addUser(result);
      }
    });
  }
}
