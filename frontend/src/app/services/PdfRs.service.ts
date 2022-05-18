import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { PdfTemplate } from '../pdf/pdf';

@Injectable({
  providedIn: 'root'
})
export class PdfRsService {
  baseUrl = 'http://localhost:8500/PdfRs';

  constructor(private http: HttpClient) { }

  getAllPdfs(reseller_id?: number, pdf_name?: string) {
    return this.http.get(this.baseUrl, {params: {
      reseller_id: reseller_id || '',
      pdf_name: pdf_name || ''
    }});
  }

  updatePdf(pdf?: PdfTemplate) {
    return this.http.post(this.baseUrl + '/save', pdf);
  }

  createPdf(pdf: PdfTemplate) {
    return this.http.post(this.baseUrl + '/create', pdf);
  }
  deletePdf(pdf: PdfTemplate) {
    return this.http.delete(this.baseUrl + '/delete/' + pdf.id);
  }
}
