import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) { } // Inject HttpClient and Router

  ngOnInit(): void {
    const userString = sessionStorage.getItem('user');

    if (userString) { // This will be false if userString is null or an empty string
      const user = JSON.parse(userString);
      if (user) {
        this.router.navigate(['/dashboard']);
      }
    }
  }

  onSubmit() {
    const authEndpoint = 'http://localhost:4200/api/auth';

    // Sending email and password to the server
    this.http.post(authEndpoint, {
      email: this.email,
      password: this.password
    }).subscribe(
      (response: any) => {
        // Handling the response from server
        if (response && response.valid) {
          console.log('Login successful!');

          // Store user in sessionStorage (without password)
          const userWithoutPassword = { ...response, password: undefined };
          sessionStorage.setItem('user', JSON.stringify(userWithoutPassword));

          this.router.navigate(['/dashboard']); // Redirect to dashboard
          this.errorMessage = '';
        } else {
          this.errorMessage = 'Invalid email or password!';
        }
      },
      error => {
        if (error.status === 401) {
          this.errorMessage = 'Invalid email or password!';
        } else {
          this.errorMessage = 'An unexpected error occurred!';
        }
        console.error('Error during authentication:', error.message, error.status, error.error);
      }
    );
  }
}
