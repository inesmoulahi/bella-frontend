import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { CartComponent } from './pages/cart/cart.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

import { CheckoutComponent } from './pages/checkout/checkout.component';
import { OrderSuccessComponent } from './pages/order-success/order-success.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { ConseilComponent } from './pages/conseil/conseil.component';
import { CreatePerfumeComponent } from './pages/create-perfume/create-perfume.component';
import { CustomPerfumesComponent } from './admin/custom-perfumes/custom-perfumes.component';






@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProductsComponent,
    ProductDetailsComponent,
    CartComponent,
    LoginComponent,
    RegisterComponent,
  
    CheckoutComponent,
    OrderSuccessComponent,
    AdminComponent,
    ContactComponent,
    ChatbotComponent,
    ConseilComponent,
    CreatePerfumeComponent,
    CustomPerfumesComponent,
   

   

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  // <= ajoute cette ligne ici
    HttpClientModule,
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
