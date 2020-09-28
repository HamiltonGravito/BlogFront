import { Component, OnInit, EventEmitter, Output, Injectable } from '@angular/core';
import { FormGroup,  FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'
import { Login } from 'src/app/model/login.model';

import { Usuario } from '../../model/usuario.model'
import { Autenticacao } from '../autenticacao.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>()

  usuario: Usuario;
  log: boolean;

  constructor(private autenticacao: Autenticacao, private rota: Router) { }

  ngOnInit(): void {
    this.usuario = new Usuario();
  }

  public exibirCadastro(): void {
    this.exibirPainel.emit('cadastro');
  }

  public logar(): void {
   this.autenticacao.logar(this.usuario)
    .subscribe(resposta => {
      this.usuario = resposta;
      localStorage.setItem("ID", this.usuario.id.toString())
      this.rota.navigate(['']);
    }, error => {
      console.log(error);
      this.log= false;
      setTimeout(() => {
        this.log= true;
      }, 5000)
    })
  }
}
