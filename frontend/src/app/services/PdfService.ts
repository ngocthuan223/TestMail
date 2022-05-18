import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  baseUrl = 'http://localhost:8500/pdf';

  constructor(private http: HttpClient) { }

  getAllPdfs() {
    return this.http.get(this.baseUrl);
  }

  updatePdf(template: any) {
    return this.http.post(this.baseUrl + '/save', template);
  }

  createPdf(template: any) {
    return this.http.post(this.baseUrl + '/create', template);
  }
}
