import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  public username: string = '';
  public email: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.select('auth').subscribe(({ user }) => {
      this.username = user?.username;
      this.email = user?.email;
    });
  }

  logout() {
    Swal.fire({
      title: 'Cerrando sesión...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    this.authService.logout().then(() => {
      Swal.close();
      this.router.navigate(['/login']);
    });
  }
}
