import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HtmlReviewComponent } from './mail-review/mail-review.component';
import { MailComponent } from './mail/mail.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PdfComponent } from './pdf/pdf.component';
import { HeaderComponent } from './header/header.component';
import { MailRsComponent } from './mail-rs/mail-rs.component';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { LoaderInterceptor } from './shared/interceptor/loading.interceptor';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { PdfRsComponent } from './pdf-rs/pdf-rs.component';

@NgModule({
  declarations: [
    AppComponent,
    MailComponent,
    HtmlReviewComponent,
    PdfComponent,
    HeaderComponent,
    MailRsComponent,
    LoadingComponent,
    PdfRsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatSnackBarModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  entryComponents: [HtmlReviewComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
