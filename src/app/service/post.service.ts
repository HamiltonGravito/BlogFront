import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../model/post.model';
import { Usuario } from '../model/usuario.model';
import { Link } from '../model/Link.model';
import { Comentario } from '../model/comentario.model';

@Injectable({
    providedIn: 'root',
})

export class PostService {

    salvarPostUrl: string = 'http://localhost:8080/post/cadastrar';
    salvarComentarioUrl: string = 'http://localhost:8080/comentario/cadastrar';
    retornarPost: string = 'http://localhost:8080/post/buscar';
    salvarImagemUrl: string = 'http://localhost:8080/imagem';
    buscarUsuarioId: string = 'http://localhost:8080/usuario';
    deletarPostUrl: string = 'http://localhost:8080/post/deletar';
    retornarLinksPost: string = 'http://localhost:8080/post/link';
    retornarComentarios: string = 'http://localhost:8080/comentario';
    
    constructor(private http: HttpClient){ }

    salvarPost(post: Post){
        return this.http.post(`${this.salvarPostUrl}`, post);
    }

    salvarComentario(comentario: Comentario){
        return this.http.post(`${this.salvarComentarioUrl}`, comentario)
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

    getPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(`${this.retornarPost}`);
    }

    getLinks(id: number): Observable<Link[]>{
        return this.http.get<Link[]>(`${this.retornarLinksPost}/${id}`);
    }

    getComentarios(id: number): Observable<Comentario[]>{
        return this.http.get<Comentario[]>(`${this.retornarComentarios}/${id}`);
    }

    /*public buscarUsuarioPorId(id: number) : Promise<Usuario>{
        return this.http.get(`${ this.buscarUsuarioId }/?id=${id}`)
        .toPromise()
        .then((resposta: Response) => {
           return resposta.json()[0];
        });
    }*/

    deletePostPorId(idPost: number, idUsuario: number): Observable<any> {
        return this.http.delete<any>(`${this.deletarPostUrl}/${idPost}/${idUsuario}`);
    }

    deleteComentarioPorId(idComentario: number, idUsuario: number): Observable<any> {
        return this.http.delete<any>(`${this.retornarComentarios}/delete/${idComentario}/${idUsuario}`);
    }
}