import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Post } from '../../model/post.model';
import { PostService } from '../../service/post.service';
import { FormBuilder, FormGroup } from '@angular/forms';

import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Imagem } from 'src/app/model/imagem.model';
import { Usuario } from 'src/app/model/usuario.model';
import { Router } from '@angular/router';

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
  listaLinks: String[] = [];
  link: string = "";
  listaImagensStr: String[] = [];
  listaImagens: Imagem[];
  controlarLinks: String;
  fileimg: File;
  progress: { percentage: number } = { percentage: 0 };
  previewUrl: any = null;
  usuario: Usuario;
  formPost: FormGroup;
  

  constructor(private service: PostService, private rota: Router) {

   }

  ngOnInit(): void {
    this.post = new Post();
    this.controlarLinks = "Cadastrar";
    this.usuario = new Usuario();
    this.alternarValor();
  }

  salvarPost(formPost: FormGroup): void {
   this.usuario = JSON.parse(localStorage.getItem("usuario"));

   this.post.usuarioId = this.usuario;
   this.post.listaLinks = this.listaLinks;
   this.post.listaImagens = this.listaImagensStr;
   
   this.service.salvarPost(this.post)
    .subscribe(resposta => {
      alert("Cadastrado com Sucesso");
      this.rota.navigate(['post']);
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
          this.listaImagensStr.push(this.imagem.imagemUrl);
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
  
  salvarLink(): void {
    let links: string = this.link;
    if(links.length > 5 && links != ""){
      this.listaLinks.push(links);
    }else {
      alert("Link Inválido")
    }
    this.link = "";
    this.alternarValor();
  }

}
