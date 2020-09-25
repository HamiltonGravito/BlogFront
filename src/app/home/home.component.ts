import { Component, OnInit } from '@angular/core';
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
 
  constructor(private postService: PostService) {
    
  }

  ngOnInit(): void {
   this.verificarSeExisteAlguemLogado();
   this.retornarPosts();
  }

  retornarPosts(): void {
     this.postService.getPosts().subscribe({
       next: posts => {
        this.posts = posts;
       }
     })
  }

  verificarSeExisteAlguemLogado(): void{
    if(localStorage.length != 0){
      this.usuarioLogado = true;
    }
  }


  deletarId(postId: number) : void {
    this.postService.deletePorId(postId).subscribe({
      next: any => {
        console.log("Cadastrado com Sucesso");
        this.retornarPosts()
       },
      error: err => console.log("Error", err) 
    }) 
  }

}
