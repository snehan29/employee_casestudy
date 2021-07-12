import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthguradServiceService } from './auth-guard-service.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private Authguardservice: AuthguradServiceService, private router: Router) { }
  canActivate(): boolean {
    if (!this.Authguardservice.gettoken()) {  
      this.router.navigateByUrl("/login");  
  }  
  return this.Authguardservice.gettoken();
  }
}
