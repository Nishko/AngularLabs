import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email!: string;
  password!: string;

  users = [
    { email: 'test1@gmail.com', password: '123' },
    { email: 'test2@gmail.com', password: '456' },
    { email: 'test3@gmail.com', password: '789' },
  ]

  errorMessage: string | null = null;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const user = this.users.find(u => u.email === this.email && u.password === this.password);

    if (user) {
      this.router.navigate(['/account']);
    } else {
      this.errorMessage = "Invalid email or password.";
    }
  }
}

