import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];
  total: number = 0;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getCart().subscribe((items: any[]) => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  calculateTotal(): void {
    this.total = this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }
}
