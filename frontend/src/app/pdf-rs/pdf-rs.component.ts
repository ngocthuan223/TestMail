import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { cloneDeep } from 'lodash';
import { HtmlReviewComponent } from '../mail-review/mail-review.component';
import { PdfTemplate } from '../pdf/pdf';
import { PdfRsService } from '../services/PdfRs.service';

@Component({
  selector: 'app-pdf-rs',
  templateUrl: './pdf-rs.component.html',
  styleUrls: ['./pdf-rs.component.scss']
})
export class PdfRsComponent implements OnInit {

  pdfs: PdfTemplate[] = [];
  form = new FormGroup({
    id: new FormControl(undefined),
    template_name: new FormControl(undefined),
    reseller_id: new FormControl(undefined),
    created_date: new FormControl(new Date()),
  });
  selectedPdf?: PdfTemplate;
  htmlPdfData?: SafeHtml;
  footerNL = false;
  footerEN = false;
  templateNl = true;
  templateEn = false;
  reviewPdf = false;
  
  resellerId?: number;
  pdfName?: string;

  constructor(
    private pdfService: PdfRsService,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog
  ) { }


  ngOnInit(): void {
    // this.loadPDFs();
  }

  loadPDFs() {
    this.pdfService.getAllPdfs().subscribe((res: any) => {
      this.pdfs = res;
      console.log(res);
    })
  }
  createPDF() {
    this.pdfService.createPdf(this.form.value).subscribe((res: any) => {
      this.loadPdfBy();
      this.form.reset();
    })
  }

  selectPdf(pdf: PdfTemplate) {
    this.pdfService.getById(pdf.id).subscribe(pdf => {
      this.selectedPdf = pdf as PdfTemplate;
      this.htmlPdfData = this.sanitizer.bypassSecurityTrustHtml(this.selectedPdf?.template_nl);   
    })
  }
  save() {
    this.pdfService.updatePdf(this.selectedPdf).subscribe((res: any) => {
      this.selectedPdf = undefined;
      this.reviewPdf = false;
      this.loadPdfBy();
    })
  }

  cancel() {
    this.selectedPdf = undefined;
    this.reviewPdf = false;
  }

  review() {
    this.reviewPdf = true;
  }

  copyToDemo(pdf: PdfTemplate) {
    this.pdfService.copyToDemo(pdf).subscribe((res: any) => {
      this.loadPdfBy();
    })
  }

  reviewPdfPopup(pdf: PdfTemplate) {
    this.pdfService.getById(pdf.id).subscribe(res => {
      const dialogRef = this.dialog.open(HtmlReviewComponent, {
        data: {
          template: (res as PdfTemplate).template_nl
        },
        panelClass: "contract-image-popup"
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });  
    });
   
  }
  loadPdfBy() {
    if(!this.resellerId && !this.pdfName) {
      this.loadPDFs();
      return;
    }
    this.pdfService.getAllPdfs(this.resellerId, this.pdfName).subscribe((res: any) => {
      this.pdfs = res;
    })
  }

  copyToOtherReserller(pdf: PdfTemplate) {
    this.pdfService.copyToOtherResseller(pdf).subscribe((res: any) => {
      this.loadPdfBy();
    })
  }

  keyupLoad(event: KeyboardEvent) {
    if(event.key === 'Enter') {
      this.loadPdfBy();
    }
  }
}
