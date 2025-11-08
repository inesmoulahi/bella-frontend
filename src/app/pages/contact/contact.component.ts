import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  message = {
    name: '',
    email: '',
    number: '',
    message: '',
    user_id: 0
  };

  confirmation = '';
  myMessages: any[] = [];

  constructor(private api: ApiService) {}

  sendMessage(): void {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(this.message.email)) {
      this.confirmation = "❌ Email invalide. Merci de corriger.";
      return;
    }

    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.message.user_id = user.id;
    }

    this.api.sendMessage(this.message).subscribe(res => {
      if (res.success) {
        this.confirmation = "✅ Message envoyé avec succès !";
        this.message = { name: '', email: '', number: '', message: '', user_id: 0 };
      } else {
        this.confirmation = "❌ " + (res.message || "Échec de l’envoi.");
      }
    });
  }

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.api.getMyMessages(user.id).subscribe((res) => {
        this.myMessages = res;
      });
    }
  }
}
