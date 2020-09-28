import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup,  FormControl } from '@angular/forms'

import { Usuario } from '../../model/usuario.model'
import { Autenticacao } from '../autenticacao.service'
@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>()

  usuario: Usuario;

  constructor( private autenticacao: Autenticacao) { }

  ngOnInit(): void {
    this.usuario = new Usuario();
  }

  public exibirLogin(): void {
    this.exibirPainel.emit('login');
  }

  cadastrar(): void{
   this.autenticacao.cadastrar(this.usuario).subscribe(resposta => {
      alert("Cadastrado com Sucesso!!!");
      localStorage.clear();
      this.exibirLogin();
    }, error => {
      alert("Não foi possivel Cadastrar seu Usuario!!!");
      console.log(error);
    })
    
  }
}
