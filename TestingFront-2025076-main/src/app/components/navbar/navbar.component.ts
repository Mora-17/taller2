import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { inject } from '@angular/core';
import Swal from 'sweetalert2'; //librería para gestión de mensajes


@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  private _router = inject(Router);
  _authService = inject(LoginService);
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  get isLoggedIn() :boolean {
    return this._authService.isLoggedIn()
  }

  logout() {
    this._authService.logout();
    // Mostramos el mensaje con SweetAlert2
    Swal.fire({
      icon: 'success',
      title: 'Sesión cerrada',
      text: 'Has cerrado sesión exitosamente.',
      showConfirmButton: false,
      timer: 2000 // Mensaje desaparece automáticamente después de 2 segundos
    }).then(() => {
      this._router.navigate(['/login'])
    });
  }

}
