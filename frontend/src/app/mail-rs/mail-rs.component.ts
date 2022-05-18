import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MailService } from '../mail/mail.service';
import {MatDialog} from '@angular/material/dialog';
import { HtmlReviewComponent } from '../mail-review/mail-review.component';
import { FormControl, FormGroup } from '@angular/forms';
import { MailRsTemplate, MailTemplate } from '../mail/mail.model';
import { MailRsService } from './mail-rs.service';
import { SnackBarService } from '../shared/services/snack-bar.service';

@Component({
  selector: 'app-mail-rs',
  templateUrl: './mail-rs.component.html',
  styleUrls: ['./mail-rs.component.scss']
})
export class MailRsComponent implements OnInit {

  mails: MailRsTemplate[] = [];
  selectedMail?: MailRsTemplate;
  reviewMail?: boolean;
  emailTo = 'mailto@infodation.vn';
  footerNL = false;
  footerEN = false;
  templateNl = true;
  templateEn = false;
  
  htmlData?: SafeHtml;

  defaultResellerId = 197;

  resellerId?: number;
  mailName?: string;

  form = new FormGroup({
    id: new FormControl(undefined),
    mail_name: new FormControl(undefined),
    lang_key: new FormControl(undefined),
    subject: new FormControl(undefined),
    subject_nl: new FormControl(undefined),
    reseller_id: new FormControl(undefined),
  });
  constructor(private mailRsService: MailRsService,  private sanitizer: DomSanitizer, public dialog: MatDialog, private snackBarService: SnackBarService) { }

  ngOnInit(): void {
    this.loadEmailBy();
  }

  loadMail() {
    this.mailRsService.getAllMails(this.defaultResellerId).subscribe((res: any) => {
      this.mails = res;
      console.log(res);
    })
  }

  selectMail(mail: MailRsTemplate) {
    this.selectedMail = mail;
    this.htmlData = this.sanitizer.bypassSecurityTrustHtml(this.selectedMail.mail_template_nl || '');          
  }

  createEmail() {
    this.mailRsService.createMail(this.form.value).subscribe((res: any) => {
      this.loadEmailBy();
      this.form.reset();
    })
  }

  save() {
    this.mailRsService.updateMail(this.selectedMail).subscribe((res: any) => {
      this.selectedMail = undefined;
      this.reviewMail = false;
      this.loadEmailBy();
    })
  }

  cancel() {
    this.selectedMail = undefined;
    this.reviewMail = false;
  }

  review() {
    this.reviewMail = true;
  }

  async sendMail() {
    this.mailRsService.sendMail(this.selectedMail, this.emailTo).subscribe((res: any) => {})
  }

  reviewMailPopup(email: MailTemplate) {
    const dialogRef = this.dialog.open(HtmlReviewComponent, {
      data: {
        template: email.mail_template_nl
      },
      panelClass: "contract-image-popup"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  copyToDemo(email: MailTemplate) {
   
  }
  loadEmailBy() {
    if(!this.resellerId && !this.mailName) {
      this.loadMail();
      return;
    }
    this.mailRsService.getAllMails(this.resellerId, this.mailName).subscribe((res: any) => {
      this.mails = res;
    })
  }
  deleteEmail(mail: MailRsTemplate) {
    if(confirm("Are you sure to delete")) {
      this.mailRsService.deleteMail(mail).subscribe((res: any) => {
        this.loadEmailBy();
        this.snackBarService.success('Delete success')
      })
    }
  }
}
