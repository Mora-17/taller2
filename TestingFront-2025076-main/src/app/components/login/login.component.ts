import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  emailLogin: string = ''
  passwordLogin: string = ''
  private _authService = inject(LoginService);
  private _router = inject(Router);

  login(): void {
    this._authService.login(this.emailLogin, this.passwordLogin).subscribe({
     
      next: (res: any) => {
        if (res) {
          localStorage.setItem('token', res.token);
          Swal.fire('Bienvenido!!', res.mensaje, 'success')
          this._router.navigate(['/']) 
        }

      },
      // acá es cuando hay un error o un estado diferente al 200
      error: (err) => {
        console.log(err.error.mensaje);
        Swal.fire('Ups!!', err.error.mensaje || 'Ocurrió un error al iniciar sesión');     
      }
    })
  }
}
