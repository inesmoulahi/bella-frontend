import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost/bella_api';

  constructor(private http: HttpClient) {}

  
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/get-products.php`);
  }

  register(data: any) {
    return this.http.post(`${this.apiUrl}/register.php`, data);
  }

  login(data: any) {
    return this.http.post(`${this.apiUrl}/login.php`, data);
  }

  

  

  removeFromCart(id: number) {
    return this.http.get(`${this.apiUrl}/remove-from-cart.php?id=${id}`);
  }

 
  
  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get-product.php?id=${id}`);
  }
  getCart(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/get-cart.php`);
  }
  placeOrder(orderData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/place-order.php`, orderData);
  }
  registerUser(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register.php`, data);
  }
  loginUser(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login.php`, data);
  }
  addToCart(product: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add-to-cart.php`, product);
  }
  getOrders(): Observable<any> {
    return this.http.get<any>('http://localhost/bella_php/get_orders.php');
  }
  
  getOrderDetails(orderId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/get_order_details.php?order_id=${orderId}`);
  }
  
  
  getAllProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-products.php`);
  }
  deleteProduct(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/delete-product.php`, { id });
  }
  addProduct(product: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add-product.php`, product);
  }
  updateProduct(product: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/update-product.php`, product);
  }
  getStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-stats.php`);
  }
  sendMessage(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/send-message.php`, data);
  }
  getMessages(): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-messages.php`);
  }
  replyMessage(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reply-message.php`, data);
  }
  
  getMyMessages(user_id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-user-messages.php?user_id=${user_id}`);
  }
   
  getPerfumeSuggestion(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/suggest-perfume.php`, data);
  }
  
  submitCustomPerfume(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-custom-perfume.php`, data);
  }
  getCustomPerfumes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/get-custom-perfumes.php`);
  }
  
  addReview(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add-review.php`, data);
  }
  
  getReviews(productId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/get-reviews.php?product_id=${productId}`);
  }
  clearCart(userId: number) {
    return this.http.post<any>('http://localhost/backend/clear_cart.php', { user_id: userId });
  }
  
 
}
