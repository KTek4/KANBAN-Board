import { JwtPayload, jwtDecode } from 'jwt-decode';
import type { UserData } from '../interfaces/UserData';

class AuthService {
  getProfile() {
    return jwtDecode<UserData>(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string) {
    try {
      const decodedToken = jwtDecode<JwtPayload>(token);

      if (decodedToken?.exp && decodedToken?.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }

    } catch (err: any) {
      console.error('There was an error decoding token: ', err);
      return false;
    }
  }

  getToken(): string {
    const currentUser = localStorage.getItem('id_token') || '';
    return currentUser;
  }

  login(idToken: string) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();
