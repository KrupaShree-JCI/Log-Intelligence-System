import { HttpInterceptorFn } from '@angular/common/http';
 
export const authInterceptor: HttpInterceptorFn = (req, next) => {
 
  const user = localStorage.getItem('user');
 
  if (user) {
    const parsed = JSON.parse(user);
 
    const clonedReq = req.clone({
      setHeaders: {
        Username: parsed.username   
      }
    });
 
    return next(clonedReq);
  }
 
  return next(req);
};