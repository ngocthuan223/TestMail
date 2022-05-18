import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { MailRsTemplate } from '../mail/mail.model';

@Injectable({
  providedIn: 'root'
})
export class MailRsService {
  baseUrl = 'http://localhost:8500/mailrs';

  constructor(private http: HttpClient) { }

  getAllMails(reseller_id?: number, mail_name?: string) {
    return this.http.get(this.baseUrl, {params: {
      reseller_id: reseller_id || '',
      mail_name: mail_name || ''
    }});
  }

  updateMail(mail?: MailRsTemplate) {
    return this.http.post(this.baseUrl + '/save', mail);
  }

  sendMail(mail?: MailRsTemplate, emailTo?: string) {
    return this.http.post(this.baseUrl + '/sendmail', {...mail, emailTo});
  }

  createMail(mail: MailRsTemplate) {
    return this.http.post(this.baseUrl + '/create', mail);
  }
  deleteMail(mail: MailRsTemplate) {
    return this.http.delete(this.baseUrl + '/delete/' + mail.id);
  }
}
