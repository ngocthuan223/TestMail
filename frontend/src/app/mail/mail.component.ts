import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {MatDialog} from '@angular/material/dialog';
import { HtmlReviewComponent } from '../mail-review/mail-review.component';
import { FormControl, FormGroup } from '@angular/forms';
import { MailTemplate } from './mail.model';
import { MailService } from './mail.service';
import { SnackBarService } from '../shared/services/snack-bar.service';


@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.scss']
})
export class MailComponent implements OnInit {

  mails: MailTemplate[] = [];
  selectedMail?: MailTemplate;
  reviewMail?: boolean;
  emailTo = 'mailto@infodation.vn';
  footerNL = false;
  footerEN = false;
  templateNl = true;
  templateEn = false;
  
  htmlData?: SafeHtml;

  defaultResellerId = 197;

  form = new FormGroup({
    id: new FormControl(undefined),
    mail_name: new FormControl(undefined),
    lang_key: new FormControl(undefined),
    subject: new FormControl(undefined),
    subject_nl: new FormControl(undefined),
  });
  constructor(private mailService: MailService,  private sanitizer: DomSanitizer, public dialog: MatDialog, private snackBarService: SnackBarService) { }

  ngOnInit(): void {
    this.loadMail();
  }

  loadMail() {
    this.mailService.getAllMails().subscribe((res: any) => {
      this.mails = res;
      console.log(res);
    })
  }

  selectMail(mail: MailTemplate) {
    this.selectedMail = mail;
    this.htmlData = this.sanitizer.bypassSecurityTrustHtml(this.selectedMail.mail_template_nl);          
  }

  createEmail() {
    this.mailService.createMail(this.form.value).subscribe((res: any) => {
      this.loadMail();
      this.form.reset();
    })
  }

  save() {
    this.mailService.updateMail(this.selectedMail).subscribe((res: any) => {
      this.selectedMail = undefined;
      this.reviewMail = false;
      this.loadMail();
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
    this.mailService.sendMail(this.selectedMail, this.emailTo).subscribe((res: any) => {})
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
    this.mailService.copyToDemo(email).subscribe((res: any) => {
      console.log(res);
    })
  }
  copyToWhiteRs(email: MailTemplate) {
    this.mailService.copyToWhiteRs(email, this.defaultResellerId).subscribe((res: any) => {
      console.log(res);
    }, () => {
      this.snackBarService.fail('Email exist for reseller 197')
    })
  }
}
