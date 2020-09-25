import { Usuario } from '../model/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../model/login.model';


@Injectable({
    providedIn: 'root',
})

export class Autenticacao {

    salvarUsuarioUrl: string = "http://localhost:8080/usuario";
    logarUrl: string = "http://localhost:8080/usuario/login";

    private usuarioLogado: Usuario;
    constructor(private http: HttpClient){}

    cadastrarUsuario(usuario: Usuario) {
        return this.http.post<Usuario>(this.salvarUsuarioUrl, usuario);
    }

    logar(login: Login) {
       return this.http.post<Usuario>(this.logarUrl, login);
    }
}