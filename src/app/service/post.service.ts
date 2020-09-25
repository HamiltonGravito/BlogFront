import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../model/post.model';
import { Usuario } from '../model/usuario.model';

@Injectable({
    providedIn: 'root',
})

export class PostService {

    salvarPostUrl: string = 'http://localhost:8080/post';
    salvarImagemUrl: string = 'http://localhost:8080/imagem';
    buscarUsuarioId: string = 'http://localhost:8080/usuario';

    constructor(private http: HttpClient){ }

    salvarPost(post: Post){
        return this.http.post(`${this.salvarPostUrl}`, post);
    }

    salvarImagem(file: File): Observable<HttpEvent<{}>>{
        const formData: FormData = new FormData();
        formData.append('file', file);
        const newRequest = new HttpRequest('POST', this.salvarImagemUrl, formData, {
            reportProgress: true,
            responseType: 'text'
        });
        return this.http.request(newRequest);
    }

    /*public buscarUsuarioPorId(id: number) : Promise<Usuario>{
        return this.http.get(`${ this.buscarUsuarioId }/?id=${id}`)
        .toPromise()
        .then((resposta: Response) => {
           return resposta.json()[0];
        });
    }*/
}