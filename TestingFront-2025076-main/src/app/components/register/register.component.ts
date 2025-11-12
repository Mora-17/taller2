import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  fullName: string = ''
  email: string = ''
  password: string = ''
  private _userService = inject(UsersService);
  private _router = inject(Router);

  onSubmit(event: Event): void {
    this._userService.postUser(this.fullName, this.email, this.password).subscribe(
      {
        next: (res: any) => {
          if (res) {
            Swal.fire('User Registered!!', res.mensaje, 'success')
            this._router.navigate(['/login'])
          }

        },
        // acá es cuando hay un error o un estado diferente al 200
        error: (err) => {
          console.log(err.error.mensaje);
          Swal.fire('Ups!!', err.error.mensaje || 'Ocurrió un error al registrar usuario');
        }
      }
    )
  }
}
