import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  order = {
    user_id: 0,
    name: '',
    number: '',
    email: '',
    method: 'paypal',
    address: '',
    total_products: '',
    total_price: 0
  };

  message = '';

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user.id) {
      this.message = '❌ Vous devez être connecté pour passer une commande.';
      return;
    }

    this.order.user_id = user.id;

    // Exemple temporaire : à remplacer plus tard par une vraie lecture du panier
    this.order.total_products = "Lavendor Rose (1), Pink Rose (2)";
    this.order.total_price = 45;
  }

  submitOrder(): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(this.order.email)) {
      this.message = "❌ Email invalide.";
      return;
    }

    this.api.placeOrder(this.order).subscribe(response => {
      if (response.success) {
        this.router.navigate(['/order-success'])
        this.api.clearCart(this.order.user_id).subscribe(() => {
         
        });
      } else {
        this.message = '❌ ' + response.message;
      }
    });
  }
}
