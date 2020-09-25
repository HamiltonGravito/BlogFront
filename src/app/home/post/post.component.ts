import { Component, OnInit } from '@angular/core';
import { Post } from '../../model/post.model';
import { PostService } from '../../service/post.service';
import { FormGroup } from '@angular/forms';
import { Links } from 'src/app/model/links.model';

import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Imagem } from 'src/app/model/imagem.model';
import { Usuario } from 'src/app/model/usuario.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers: [PostService]
})
export class PostComponent implements OnInit {

  imagem: Imagem;
  post: Post;
  respostaPost: Post;
  links: Links;
  listaLinks: Links[];
  controlarLinks: String;
  fileimg: File;
  progress: { percentage: number } = { percentage: 0 };
  previewUrl: any = null;
  usuario: Usuario

  constructor(private service: PostService) { }

  ngOnInit(): void {
    this.post = new Post();
    this.links = new Links();
    this.controlarLinks = "Cadastrar";
    this.usuario = new Usuario();
  }


  salvarPost(formPost: FormGroup): void {
   this.usuario = JSON.parse(localStorage.getItem("user"));
   console.log(this.usuario);
    this.post.usuarioId = this.usuario;
    console.log(this.post)
    this.service.salvarPost(this.post)
    .subscribe(resposta => {
      console.log(resposta);  
    }, error => {
      console.log(error);
    })
  }

  alternarValor(){
    if(this.listaLinks.length > 0){
      this.controlarLinks = "Cadastrar Mais"
    }
  }

  salvarImagem(): void {
    this.imagem = new Imagem();
    this.service.salvarImagem(this.fileimg)
      .subscribe((event => {
        if(event.type === HttpEventType.UploadProgress){
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
        }else if(event instanceof HttpResponse){
          console.log(event.body);
          this.imagem.imagemUrl = JSON.stringify(event.body);
          console.log(this.imagem.imagemUrl);
          $(function () {
            $('#modalImagem').modal('hide');
          });
        }
      }), error => {
        console.log(error.message);
      })   
  }

  //Exibir preview da Imagem (Recebo um evento do tipo input, dentro desse evento acesso e mostro o File escolhido)
  preview(fileInput: any, formImagem: FormGroup) {
    this.fileimg = <File>fileInput.target.files[0];
    console.log(this.fileimg);
    var mimeType = this.fileimg.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    var reader = new FileReader();      
    reader.readAsDataURL(this.fileimg); 
    reader.onload = (_event) => { 
      this.previewUrl = reader.result; 
    }
  }

}
