import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { MailTemplate } from './mail.model';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  baseUrl = 'http://localhost:8500/mail';

  constructor(private http: HttpClient) { }

  getAllMails() {
    return this.http.get(this.baseUrl);
  }

  updateMail(mail?: MailTemplate) {
    return this.http.post(this.baseUrl + '/save', mail);
  }

  sendMail(mail?: MailTemplate, emailTo?: string) {
    return this.http.post(this.baseUrl + '/sendmail', {...mail, emailTo});
  }

  createMail(mail?: MailTemplate) {
    return this.http.post(this.baseUrl + '/create', mail);
  }

  copyToDemo(mail?: MailTemplate) {
    return this.http.post(this.baseUrl + '/copy-to-demo', {mail_name: mail?.mail_name});
  }

  copyToWhiteRs(mail?: MailTemplate, reseller_id?: number) {
    return this.http.post(this.baseUrl + '/copy-to-white-rs', {mail_name: mail?.mail_name, reseller_id});
  }

  restoreFromDemo(mail: MailTemplate) {
    return this.http.post(this.baseUrl + '/restore-from-demo', {mail_name: mail.mail_name});
  }

  getById(id: number) {
    return this.http.get(this.baseUrl + `/${id}`);
  }
}
