import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUsuario } from 'app/Models/Usuario';
import { environment } from 'environments/environment';
/* import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators'; */
/* import { Mail, MailCategory, MailFilter, MailFolder, MailLabel } from 'app/modules/admin/admin/admin.types'; */

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    private apiUrl = environment.apiBackend;

    constructor(private _httpClient: HttpClient) {
    }

    getUsuarios() {
        return this._httpClient.get(`${this.apiUrl}/Usuarios`);
    }

    crearUsuario(usuario : IUsuario){
        return this._httpClient.post(`${this.apiUrl}/Usuarios`, usuario);
    }
}
