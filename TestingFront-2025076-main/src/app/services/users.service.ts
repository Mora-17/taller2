import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

    private apiUrl = "http://localhost:9000/usuarios"
    private _httpClient = inject(HttpClient);

    postUser(fullName: string, email: string, password: string){
      return this._httpClient.post(this.apiUrl, {fullName, email, password})
    }

    getUser(){
      return this._httpClient.get(this.apiUrl)
    }
}
