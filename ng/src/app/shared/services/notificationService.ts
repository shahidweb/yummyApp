import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  toast = inject(ToastrService);


  success(message: string) {
    this.toast.success(message);
  }

  error(message: string) {
    this.toast.error(message);
  }

  info(message: string) {
    this.toast.info(message);
  }

  warning(message: string) {
    this.toast.warning(message);
  }


}
