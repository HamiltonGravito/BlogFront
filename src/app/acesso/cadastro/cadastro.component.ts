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

  public formulario: FormGroup = new FormGroup({
    'nome' : new FormControl(null),
    'senha' : new FormControl(null)
  });
  constructor( private autenticacao: Autenticacao) { }

  ngOnInit(): void {
  }

  public exibirLogin(): void {
    this.exibirPainel.emit('login');
  }

  public cadastrarUsuario(): void{
    let usuario: Usuario = new Usuario(
      this.formulario.value.nome,
      this.formulario.value.senha
    )
   this.autenticacao.cadastrarUsuario(usuario)
    .subscribe(resposta => {
      console.log(resposta);
    }, error => {
      console.log(error);
    })
    this.exibirLogin();
  }

}
