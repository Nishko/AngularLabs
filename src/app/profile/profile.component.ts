import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    const userData = sessionStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    } else {
      // Redirect to login
      this.router.navigate(['/login']);
    }
  }

  onSubmit(): void {
    sessionStorage.setItem('currentUser', JSON.stringify(this.user));
  }
}

