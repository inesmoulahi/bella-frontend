import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  user = {
    name: '',
    email: '',
    password: ''
  };

  message = '';

  constructor(private api: ApiService) {}

  register(): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Vérification de l'email
    if (!emailRegex.test(this.user.email)) {
      this.message = '❌ Email invalide. Veuillez entrer un email correct.';
      return;
    }

    this.api.registerUser(this.user).subscribe(res => {
      if (res.success) {
        this.message = '✅ Inscription réussie ! Vous pouvez vous connecter.';
      } else {
        this.message = '❌ ' + res.message;
      }
    });
  }
}
