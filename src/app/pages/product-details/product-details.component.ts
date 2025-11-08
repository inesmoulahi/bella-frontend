import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: any = {};
  

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.api.getProductById(productId).subscribe(data => {
      this.product = data;
       // Ton ancienne fonction
      this.loadReviews(); 
    });
  
  }
  reviews: any[] = [];
newReview = {
  comment: '',
  rating: 5
};

loadReviews(): void {
  this.api.getReviews(this.product.id).subscribe((data) => {
    this.reviews = data;
  });
}

submitReview(): void {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (!user.id) {
    alert("Connectez-vous pour laisser un avis !");
    return;
  }

  const reviewData = {
    user_id: user.id,
    product_id: this.product.id,
    comment: this.newReview.comment,
    rating: this.newReview.rating
  };

  this.api.addReview(reviewData).subscribe(res => {
    if (res.success) {
      this.newReview.comment = '';
      this.newReview.rating = 5;
      this.loadReviews();
    }
  });
}




}
