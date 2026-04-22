import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
 
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
 
  return next(req).pipe(
    catchError((error) => {
 
      if (error.status === 401) {
        console.error("Unauthorized - redirect to login");
 
        
        window.location.href = '/login';
      }
 
      if (error.status === 403) {
        console.error("Forbidden - no access");
      }
 
      return throwError(() => error);
    })
  );
};
 