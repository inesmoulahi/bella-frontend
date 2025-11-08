import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  // Tableau de produits récupéré depuis le back-end
  products: any[] = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getProducts().subscribe((data: any[]) => {
      // On peut aussi vérifier si on a au moins 15 produits, sinon le template affichera ce qui est retourné
      this.products = data;
      // Pour simuler 15 produits, s'il n'y en a pas, tu peux dupliquer l'array par exemple :
      while (this.products.length < 9) {
        this.products = this.products.concat(this.products);
      }
      this.products = this.products.slice(0, 9);
    });
  }

  // Méthode pour ajouter au panier ; on appelle ici le service API addToCart (à créer dans ApiService)
  addToCart(product: any): void {
    this.api.addToCart(product).subscribe((res: any) => {
      if (res.success) {
        alert('✅ ' + res.message);
      } else {
        alert('❌ ' + res.message);
      }
    });
  }
  
}
