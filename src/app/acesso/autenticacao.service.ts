import { Usuario } from '../model/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class Autenticacao {

    salvarUsuarioUrl: string = "http://localhost:8080/usuario";

    constructor(private http: HttpClient){}

    cadastrarUsuario(usuario: Usuario) {
        console.log(usuario);
        return this.http.post(this.salvarUsuarioUrl, usuario);
    }
}