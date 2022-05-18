import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MailService } from '../mail/mail.service';
interface MailTemplate {
  id: number;
  mail_name: string;
  lang_key:string;
  subject: string;
  subject_nl: string;
  mail_template_en: string;
  mail_template_nl:string;
  footer: string;
  footer_nl: string; 
}
@Component({
  selector: 'app-mail-review',
  templateUrl: './mail-review.component.html',
  styleUrls: ['./mail-review.component.scss']
})
export class HtmlReviewComponent implements OnInit {
  htmlData?: SafeHtml;
  constructor(private sanitizer: DomSanitizer, @Inject(MAT_DIALOG_DATA) public data: {template: string}) { }

  ngOnInit(): void {
    this.htmlData = this.sanitizer.bypassSecurityTrustHtml(this.data?.template || '');        
  }

  viewMail() {
    
  }
}
