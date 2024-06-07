import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICreateUser } from '../../../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SingUpService {
  constructor(private http: HttpClient) {}
  createUser(newUser: ICreateUser) {
    const url = `${environment.hostApiUrl}/admins`;
    return this.http.post<Response>(url, newUser);
  }
}
