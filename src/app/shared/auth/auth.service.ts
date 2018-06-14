import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';
import { AUTH_CONFIG } from './auth';

(window as any).global = window;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.clientID,
    domain: AUTH_CONFIG.domain,
    responseType: 'token id_token',
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    redirectUri: AUTH_CONFIG.callbackURL,
    scope: 'openid profile'
  });
  userProfile: any;
  loggedIn: boolean;
  loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);
  constructor(public router: Router) {
    const lsProfile = localStorage.getItem('profile');

    if (this.tokenValid) {
      this.userProfile = JSON.parse(lsProfile);
      this.setLoggedIn(true);
    } else if (!this.tokenValid && lsProfile) {
      this.logout();
    }
  }

  setLoggedIn(value: boolean) {
    this.loggedIn$.next(value);
    this.loggedIn = value;
  }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.getProfile(authResult);
      } else if (err) {
        this.router.navigate(['/']);
        console.log(err);
      }
    });
  }
  private getProfile (authResult): void {
    this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      if (profile) {
        this.setSession(authResult, profile);
      } else if (err) {
        console.error(`Error authenticating: ${err.error}`);
      }
    });
  }
  private setSession(authResult, profile): void {
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('profile', JSON.stringify(profile));
    this.userProfile = profile;
    this.setLoggedIn(true);
    this.router.navigate(['/joke']);
  }

  public logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('authRedirect');
    this.userProfile = undefined;
    this.setLoggedIn(false);
    this.router.navigate(['/']);
  }

  get tokenValid(): boolean {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return Date.now() < expiresAt;
  }
}
