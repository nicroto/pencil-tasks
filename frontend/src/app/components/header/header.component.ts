import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isUserLogged: boolean = false;

  private userStateSubscription: Subscription;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    this.userStateSubscription = this.auth.user.subscribe(user => {
      this.isUserLogged = !!user;
    });
  }

  signOut(): void {
    this.auth.signOut()
    .then(() => {
      console.log('User is no logged logged: Redirecting to / ...')
      this.router.navigate(['/signin']);
    });
  }


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.userStateSubscription.unsubscribe();
  }

}
