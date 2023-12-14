import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/local-storage/local-storage.service';
import { ToastService } from 'src/app/shared/toast/toast.service';


export const authGuard: CanActivateFn = (route, state) => {
  const localStorageService = inject(LocalStorageService);
  const router = inject(Router);
  const toastService = inject(ToastService);
  if(localStorageService.getItem("token") == null)
  {
    toastService.error("Token no encontrado");
    router.navigate(['/login']);
    return false;
  }
  return true;
};
