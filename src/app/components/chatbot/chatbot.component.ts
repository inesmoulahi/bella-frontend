import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {

  messages: string[] = [];
  currentStep = 0;
  userAnswers: any = {};
  userInput = '';
  showChat = false;
  lastImage = '';

  steps = [
    "Bonjour😊 !  Je suis ton assistant parfum Bella: Es-tu un homme ou une femme ?",
    "Quel type de parfum préfères-tu ? (floral, boisé, fruité, lavande)",
    "Pour quelle occasion ? (journée, soirée, quotidien)",
    "Quel est ton budget ? (pas cher, moyen, luxe)",
    "Merci 💖! Voici le parfum parfait pour toi 💐 :"
  ];

  constructor(public api: ApiService) {}

  ngOnInit(): void {
    this.messages.push(`🤖 ${this.steps[0]}`);
  }

  toggleChat(): void {
    this.showChat = !this.showChat;
  }

  send(): void {
    if (!this.userInput.trim()) return;

    this.messages.push(`👤 ${this.userInput}`);

    switch (this.currentStep) {
      case 0: this.userAnswers.genre = this.userInput.toLowerCase(); break;
      case 1: this.userAnswers.type = this.userInput.toLowerCase(); break;
      case 2: this.userAnswers.occasion = this.userInput.toLowerCase(); break;
      case 3: this.userAnswers.budget = this.userInput.toLowerCase(); break;
    }

    this.userInput = '';
    this.currentStep++;

    setTimeout(() => {
      if (this.currentStep < this.steps.length - 1) {
        this.messages.push(`🤖 ${this.steps[this.currentStep]}`);
      } else {
        this.api.getPerfumeSuggestion(this.userAnswers).subscribe((res) => {
          const suggestion = `✨ *${res.name}* – ${res.details} (${res.price} dt)`;
          this.lastImage = res.image;
          this.messages.push(`🤖 ${this.steps[4]} ${suggestion}`);
        });
      }
    }, 400);
  }
}
