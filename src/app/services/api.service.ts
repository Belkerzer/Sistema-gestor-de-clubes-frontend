import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = environment.apiBackend;
  headers = new HttpHeaders().append('Access-Control-Allow-Origin', '*');
  constructor(private httpClient: HttpClient) {}

    getParticipantes(): Observable<ParticipantesResponse[]>{
      return this.httpClient.get<ParticipantesResponse[]>(`${this.apiUrl}/participantes`, {headers: this.headers});
    }

    getParticipanteById(id: number){
        return this.httpClient.get<ParticipantesResponse[]>(`${this.apiUrl}/participantes/${id}`, {headers: this.headers});
    }

    getClubes(): Observable<ClubesResponse[]>{
        return this.httpClient.get<ClubesResponse[]>(`${this.apiUrl}/clubes`, {headers: this.headers});
    }

    getClubesById(id: number): Observable<ClubesResponse[]>{
        return this.httpClient.get<ClubesResponse[]>(`${this.apiUrl}/clubes/${id}`, {headers: this.headers});
    }
}


export interface ParticipantesResponse {
    id:                number;
    cedula:            string;
    codigo:            string;
    correoElectronico: string;
    nombresCompletos:  string;
    nacimiento:        Date | null;
    periodo:           string;
    sexo:              string;
    carrera:           string;
    facultad:          string;
    club:              string;
    estado:            boolean;
    fechaCreacion:     string;
    fechaModificacion: null;
}

export interface ClubesResponse {
    idClub:            number;
    nombreClub:        string;
    descripcion:       string;
    fechaInicio:       string;
    fechaCierre:       string;
    facultad:          string;
    programa:          string;
    departamento:      string;
    tipo:              string;
    participantes:     ParticipantesResponse[];
    docentes:          any[];
    fechaCreacion:     string;
    fechaModificacion: null;
}

