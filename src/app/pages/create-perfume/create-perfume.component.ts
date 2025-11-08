import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-create-perfume',
  templateUrl: './create-perfume.component.html',
  styleUrls: ['./create-perfume.component.css']
})
export class CreatePerfumeComponent {

  custom = {
    user_id: 0,
    name: '',
    ingredients: [] as string[],
    bottle_message: ''
  };
  

  ingredientOptions: string[] = ['Rose', 'Lavande', 'Jasmin', 'Bois de santal', 'Vanille', 'Musc'];
  confirmation: string = '';

  constructor(private api: ApiService) {}

  updateIngredients(ingredient: string, isChecked: boolean): void {
    if (isChecked) {
      if (!this.custom.ingredients.includes(ingredient)) {
        this.custom.ingredients.push(ingredient);
      }
    } else {
      this.custom.ingredients = this.custom.ingredients.filter(i => i !== ingredient);
    }
  }

  submitCustomPerfume(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.custom.user_id = user.id || 0;

    if (!this.custom.name || this.custom.ingredients.length === 0) {
      this.confirmation = "❌ Veuillez entrer un nom et choisir au moins un ingrédient.";
      return;
    }

    this.api.submitCustomPerfume(this.custom).subscribe((res) => {
      this.confirmation = res.message;
      this.custom = { user_id: this.custom.user_id, name: '', ingredients: [], bottle_message: '' };
    });
  }
  
}
