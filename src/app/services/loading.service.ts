import { Injectable } from '@angular/core';
import {BehaviorSubject, timer} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private isLoading = new BehaviorSubject(false);

  startLoading() {
    this.isLoading.next(true);
    document.body.classList.add('lock-scroll');
  }

  stopLoading() {
    timer(1150).subscribe(() => {
      this.isLoading.next(false);
      document.body.classList.remove('lock-scroll');
    });
  }

  isLoadingStatus() {
    return this.isLoading;
  }
}
