import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { User } from '../../interfaces/interface';

@Component({
  selector: 'dialog',
  templateUrl: 'create-edit-user.component.html',
  styleUrls: ['create-edit-user.component.scss'],
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateEditUserComponent implements OnInit {
  readonly data = inject(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(
    MatDialogRef<CreateEditUserComponent, { isEdit: boolean; user?: User }>,
  );
  private readonly fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    id: [new Date().getTime(), Validators.required],
    name: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    phone: ['', Validators.required],
  });

  ngOnInit(): void {
    this.form.patchValue(this.data.user);
  }

  submitForm() {
    this.dialogRef.close(this.form.value);
  }
}
