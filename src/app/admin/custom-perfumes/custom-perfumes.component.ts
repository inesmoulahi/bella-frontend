import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-custom-perfumes',
  templateUrl: './custom-perfumes.component.html',
  styleUrls: ['./custom-perfumes.component.css']
})
export class CustomPerfumesComponent implements OnInit {
  perfumes: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getCustomPerfumes().subscribe((data) => {
      this.perfumes = data;
    });
  }
  imprimerParfum(parfum: any): void {
    const content = `
      <div style="font-family: Arial; padding: 20px;">
        <h2 style="color: #d81b60;">🌸 Bella - Création personnalisée</h2>
        <p><strong>Nom du parfum :</strong> ${parfum.name}</p>
        <p><strong>Ingrédients :</strong> ${parfum.ingredients}</p>
        <p><strong>Message personnalisé :</strong> ${parfum.bottle_message || '(aucun)'}</p>
        <p><strong>Date de création :</strong> ${parfum.created_at}</p>
        <br>
        <p style="font-style: italic;">Merci d’avoir choisi Bella 🌹</p>
      </div>
    `;
  
    const printWindow = window.open('', '', 'height=700,width=600');
    if (printWindow) {
      printWindow.document.write(`<html><head><title>Impression</title></head><body>${content}</body></html>`);
      printWindow.document.close();
      printWindow.print();
    }
  }
  
}
