import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { ROUTING_PATH } from '../../shared/services/routing-path.const';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  signInWithGoogle(): void {
    this.auth.signInWithGoogle()
    .then(() => {
      this.router.navigate([ROUTING_PATH.HOME]);
    });
  }

}
