import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

  products: any[] = [];
  editMode = false;
  editProduct: any = null;
  stats = {
    products: 0,
    users: 0,
    orders: 0,
    sales: 0
  };
  messages: any[] = [];
  replyTexts: { [key: number]: string } = {};
  constructor(private router: Router, private api: ApiService) {}

  ngOnInit(): void {
    console.log("teeeeeest");
    const userData = localStorage.getItem('user');
    const user = userData ? JSON.parse(userData) : null;
  
    if (!user || user.user_type !== 'admin') {
      this.router.navigate(['/']);
    } else {
      this.getAllProductsAdmin();
    console.log('Produits chargés 222222:', this.products);

      console.log(this.products);
      this.api.getStats().subscribe(res => this.stats = res);
      console.log(this.stats);
      this.api.getMessages().subscribe(res => this.messages = res);
    }
  }

  getAllProductsAdmin() {
    this.api.getAllProducts().subscribe(res => {
      // S'assurer que chaque produit est bien un objet et non une string JSON
      this.products = res.map((p: any) => {
        if (typeof p === 'string') p = JSON.parse(p);
        return {
          ...p,
          id: +p.id,
          price: +p.price
        };
      });
  
      console.log('Produits chargés:', this.products);
    });
  }

  deleteProduct(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce produit ?')) {
      this.api.deleteProduct(id).subscribe((res) => {
        if (res.success) {
          alert(res.message);
          this.products = this.products.filter(p => p.id !== id);
        } else {
          alert('Erreur : ' + res.message);
        }
      });
    }
  }
  newProduct = {
    name: '',
    details: '',
    price: null,
    image: ''
  };
  
  addProduct(): void {
    if (this.newProduct.name && this.newProduct.details && this.newProduct.price && this.newProduct.image) {
      this.api.addProduct(this.newProduct).subscribe((res) => {
        if (res.success) {
          alert(res.message);
          this.products.push({ ...this.newProduct }); // Ajouter à l'affichage
          this.newProduct = { name: '', details: '', price: null, image: '' }; // Reset formulaire
        } else {
          alert('Erreur : ' + res.message);
        }
      });
    } else {
      alert('Tous les champs sont obligatoires');
    }
  }
  startEdit(product: any, dialog: HTMLDialogElement): void {
    this.editProduct = { ...product };
    dialog.showModal();
  }
  closeDialog(): void {
    const dialog = document.querySelector('dialog');
    if (dialog) (dialog as HTMLDialogElement).close();
  }
  
  saveProduct(): void {
    this.api.updateProduct(this.editProduct).subscribe((res) => {
      if (res.success) {
        alert(res.message);
        const index = this.products.findIndex(p => p.id === this.editProduct.id);
        if (index !== -1) this.products[index] = { ...this.editProduct };
        this.closeDialog();
      } else {
        alert('Erreur : ' + res.message);
      }
    });
  }
  sendReply(id: number): void {
    const reply = this.replyTexts[id];
    if (!reply) return;
  
    this.api.replyMessage({ id, reply }).subscribe((res) => {
      if (res.success) {
        alert('✅ Réponse envoyée !');
        const msg = this.messages.find(m => m.id === id);
        if (msg) msg.reply = reply;
        this.replyTexts[id] = ''; // reset
      } else {
        alert('❌ Échec de l’envoi.');
      }
    });
  }
    
}
