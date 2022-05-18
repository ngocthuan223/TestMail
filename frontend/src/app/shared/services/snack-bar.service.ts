import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) {}

  success(message: string) {
    this.snackBar.open(message, "Success",
    {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    })
  }

  fail(message: string) {
    this.snackBar.open(message, "Fail",
    {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    })
  }
}
