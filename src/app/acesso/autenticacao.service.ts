import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../model/login.model';
import { Usuario } from '../model/usuario.model';


@Injectable({
    providedIn: 'root',
})

export class Autenticacao {

    cadastrarUrl: string = "http://localhost:8080/usuario/cadastrar";
    logarUrl: string = "http://localhost:8080/usuario/logar";

    login: Login;
    
    constructor(private http: HttpClient){}

    headers = new HttpHeaders();
    
    cadastrar(usuario: Usuario){
        return this.http.post(`${this.cadastrarUrl}`, usuario);
    }

    logar(usuario: Usuario) {
       return this.http.post<Usuario>(`${this.logarUrl}`, usuario);
    }
    
}