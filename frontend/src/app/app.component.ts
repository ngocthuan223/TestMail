import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoadingService } from './shared/components/loading/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{

  title = 'frontend';
  showLoading?: boolean;

  constructor(private loadingService: LoadingService, private cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.loadingService.loaderState.subscribe(state => {
      this.showLoading = state.show;
      this.cdr.detectChanges();
    })
  }
}
