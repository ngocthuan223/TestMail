import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { PdfTemplate } from '../pdf/pdf';

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

  copyToDemo(pdf: PdfTemplate) {
    return this.http.post(this.baseUrl + '/copy-to-demo', pdf);
  }

  getById(id: number) {
    return this.http.get(this.baseUrl + `/${id}`);
  }

  copyToWhiteRs(id: number) {
    return this.http.post(this.baseUrl + '/copy-to-white-rs', {id});
  }

  restoreFromDemo(template_name: string) {
    return this.http.post(this.baseUrl + '/restore-from-demo', {template_name});
  }
}
