import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Comentario } from '../model/comentario.model';
import { Link } from '../model/Link.model';
import { Post } from '../model/post.model';
import { Usuario } from '../model/usuario.model';
import { PostService } from '../service/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})
export class HomeComponent implements OnInit {


  usuarioLogado: boolean = false;
  posts: Post[] = [];
  links: Link[] = [];
  imagens: String[] = [];
  comentarios: Comentario[] = [];
  comentarioNovo: Comentario;
  arrayReferences: string[] = [];
  idLocal: number;
  comentario: Comentario = new Comentario();
  postIdSelecionado: Post = null;
 
  constructor(private postService: PostService, private rota: Router) {
    
  }

  ngOnInit(): void {
   this.verificarSeExisteAlguemLogado();
   this.retornarPosts();
   this.comentarioNovo = new Comentario();
  }

  retornarPosts(): void {
     this.postService.getPosts().subscribe({
       next: posts => {
        this.posts = posts;
       }
     })
  }

  tratarCarossel(posts: Post[]){
     posts.forEach(element => {
          this.arrayReferences.push(element.id.toString());
        });    
  }

  verificarSeExisteAlguemLogado(): void{
    if(localStorage.length != 0){
      this.usuarioLogado = true;
    }
  }


  deletarPost(idPost: number) : void {
   this.idLocal = this.recuperarLocalStorage();
    if(this.idLocal === 0 || isNaN(this.idLocal)){
     alert("Entre ou cadastre-se para Interagir");
     this.rota.navigate(['login']);
    }else {
    this.postService.deletePostPorId(idPost, this.idLocal).subscribe({
      next: any => {
        this.retornarPosts()
       },
      error: err => {
        console.log("Error", err);
      alert("Esse Post não Pertence a você!");
      }
    }) 
  }
  }

  deletarComentario(idComentario: number): void{
    this.idLocal = this.recuperarLocalStorage();
    if(this.idLocal === 0 || isNaN(this.idLocal)){
      alert("Entre ou cadastre-se para Interagir");
      this.rota.navigate(['login']);
     }else {
     this.postService.deleteComentarioPorId(idComentario, this.idLocal).subscribe({
       next: any => {
        this.rota.navigate(['/', '']);
        },
       error: err => {
         console.log("Error", err);
       alert("Esse Comentário não Pertence a você!");
       }
     }) 
   }
   }

  buscarLinkPost(postId: number) : void {
    this.postService.getLinks(postId).subscribe({
      next: links => {
        this.links = links;
      },
      error: err => {
        console.log('Error', err);
      } 
    })
  }

  buscarComentarioPost(postId: Post) : void {
    this.postIdSelecionado = postId;
    this.postService.getComentarios(postId.id).subscribe({
      next: comentarios => {
        this.comentarios = comentarios;
        console.log(comentarios)
      },
      error: err => {
        console.log('Error', err);
      }
    })
  }

  buscarImagensPorPost(postId: Post) : void {
    this.postIdSelecionado = postId;
    this.postService.getImagens(postId.id).subscribe({
      next: imagens =>{
        this.imagens = imagens;
        console.log(imagens)
      }, error: err => {
        console.log('Error', err);
      }
    })
  }

  salvarComentario(): void {
    this.comentarioNovo.comentario = this.comentario.comentario;
    this.comentarioNovo.postId = this.postIdSelecionado;
    this.comentarioNovo.usuarioId = JSON.parse(localStorage.getItem('usuario'));

    this.postService.salvarComentario(this.comentarioNovo).subscribe({
      next: resposta => {
        alert("Cadastrado com Sucesso");
        this.buscarComentarioPost(this.comentarioNovo.postId);
        this.comentario.comentario="";
      }
    })
  }

  recuperarLocalStorage(): number{
    let usuario: Usuario = JSON.parse(localStorage.getItem('usuario'));
    if(usuario == null){
      return 0
    }else{
      return usuario.id;
    }
   
  }

}
