import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [],
})
export class NavbarComponent implements OnInit {
  public username: string = '';
  private uiSubscription: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.uiSubscription = this.store.select('auth').subscribe(({ user }) => {
      this.username = user?.username;
    });
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }
}
