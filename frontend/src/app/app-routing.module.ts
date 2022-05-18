import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MailRsComponent } from './mail-rs/mail-rs.component';
import { MailComponent } from './mail/mail.component';
import { PdfRsComponent } from './pdf-rs/pdf-rs.component';
import { PdfComponent } from './pdf/pdf.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'mail',
  },
  {
    path: 'mail',
    component: MailComponent
  },
  {
    path: 'mail_rs',
    component: MailRsComponent
  },
  {
    path: 'pdf',
    component: PdfComponent
  },
  {
    path: 'pdf-rs',
    component: PdfRsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
