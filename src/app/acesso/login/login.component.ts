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
  login: Login;
  log: boolean;

  constructor(private autenticacao: Autenticacao, private rota: Router) { }

  ngOnInit(): void {
    this.login = new Login();
  }

  public exibirCadastro(): void {
    this.exibirPainel.emit('cadastro');
  }

  public logar(): void {
   this.autenticacao.logar(this.login)
    .subscribe(resposta => {
      console.log(resposta);
      let usuario : Usuario = resposta;
      localStorage.setItem("user", JSON.stringify(usuario));
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
