import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user = {
    email: '',
    password: ''
  };

  message = '';

  constructor(private api: ApiService, private router: Router) {}

  login(): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Vérifie si l'email est bien structuré
    if (!emailRegex.test(this.user.email)) {
      this.message = "❌ Email invalide. Veuillez entrer un email au bon format.";
      return;
    }

    this.api.loginUser(this.user).subscribe(res => {
      if (res.success) {
        localStorage.setItem('user', JSON.stringify(res.user));
        this.router.navigate(['/']); // Rediriger vers accueil
      } else {
        this.message = '❌ ' + res.message;
      }
    });
  }
}
