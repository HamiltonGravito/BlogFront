import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Link } from '../model/Link.model';
import { Post } from '../model/post.model';
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
  arrayReferences: string[] = [];
  idLocal: number;
 
  constructor(private postService: PostService, private rota: Router) {
    
  }

  ngOnInit(): void {
   this.verificarSeExisteAlguemLogado();
   this.retornarPosts();
   console.log(this.links);
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
    if(isNaN(this.idLocal)){
     alert("Entre ou cadastre-se para Interagir");
     this.rota.navigate(['login']);
    }else {
    this.postService.deletePorId(idPost, this.idLocal).subscribe({
      next: any => {
        console.log(any);
        this.retornarPosts()
       },
      error: err => {
        console.log("Error", err);
      alert("Esse Post não Pertence a você!");
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

  recuperarLocalStorage(): number{
    return parseInt(localStorage.getItem('ID'));
  }

}
