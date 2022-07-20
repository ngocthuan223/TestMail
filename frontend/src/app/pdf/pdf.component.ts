import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { cloneDeep } from 'lodash';
import { HtmlReviewComponent } from '../mail-review/mail-review.component';
import { PdfService } from '../services/PdfService';
import { PdfTemplate } from './pdf';
import { SnackBarService } from '../shared/services/snack-bar.service';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss']
})
export class PdfComponent implements OnInit {
  pdfs: PdfTemplate[] = [];
  form = new FormGroup({
    id: new FormControl(undefined),
    template_name: new FormControl(undefined),
    lang_key: new FormControl(undefined),
    template_en: new FormControl(undefined),
    template_nl: new FormControl(undefined),
    create_date: new FormControl(new Date()),
  });
  selectedPdf?: PdfTemplate;
  htmlPdfData?: SafeHtml;
  footerNL = false;
  footerEN = false;
  templateNl = true;
  templateEn = false;
  reviewPdf = false;


  constructor(
    private pdfService: PdfService,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog,
    private snackBarService: SnackBarService
  ) { }


  ngOnInit(): void {
    this.loadPDFs();
  }

  loadPDFs() {
    this.pdfService.getAllPdfs().subscribe((res: any) => {
      this.pdfs = res;
    })
  }
  createPDF() {
    this.pdfService.createPdf(this.form.value).subscribe((res: any) => {
      this.loadPDFs();
      this.form.reset();
    })
  }

  selectPdf(pdf: PdfTemplate) {
    this.pdfService.getById(pdf.id).subscribe((pdf: any) => {
      this.selectedPdf = pdf;
      this.htmlPdfData = this.sanitizer.bypassSecurityTrustHtml(this.selectedPdf?.template_nl as string);          
    })
  }
  save() {
    this.pdfService.updatePdf(this.selectedPdf).subscribe((res: any) => {
      this.reviewPdf = false;
    })
  }

  cancel() {
    this.selectedPdf = undefined;
    this.reviewPdf = false;
    this.loadPDFs();
  }

  review() {
    this.reviewPdf = true;
  }

  copyToDemo(pdf: PdfTemplate) {
    this.pdfService.copyToDemo(pdf).subscribe((res: any) => {
      this.loadPDFs();
    })
  }

  reviewPdfPopup(pdf: PdfTemplate) {
    this.pdfService.getById(pdf.id).subscribe((pdf: any) => {
      const dialogRef = this.dialog.open(HtmlReviewComponent, {
        data: {
          template: pdf.template_nl
        },
        panelClass: "contract-image-popup"
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    })
    
  }
  copyToWhiteRs(pdf: PdfTemplate) {
    this.pdfService.copyToWhiteRs(pdf.id).subscribe((res: any) => {
      if(res) {
        this.snackBarService.success('copy mail success' + pdf.template_name)
      } else {
        this.snackBarService.fail('Not found this mail templte on Demo')
      }
    }, () => {
      this.snackBarService.fail('copy mail fail')
    })
  }

  restoreFromDemo(pdf: PdfTemplate) {
    this.pdfService.restoreFromDemo(pdf.template_name).subscribe((res: any) => {
      if(res) {
        this.snackBarService.success('Restore mail success ' + pdf.template_name)
      } else {
        this.snackBarService.fail('Not found this mail templte on Demo')
      }
    }, () => {
      this.snackBarService.fail('Restore mail fail')
    })
  }
}
