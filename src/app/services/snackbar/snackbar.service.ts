import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) {
  }

  public openSnackBar(message: string, error: boolean, duration: number): void {
    let text = this.configText(error);

    if (error) {
      this.snackBar.open(message, '', {
        //duration: 8000,
        panelClass: ['mat-toolbar', text]
      });
    } else {
      this.snackBar.open(message, '', {
        duration: duration,
        panelClass: ['mat-toolbar', text]
      });
    }
  }

  private configText(error: boolean) {

    if (error) {
      return 'mat-warn';
    } else {
      return 'mat-primary';
    }
  }
}
