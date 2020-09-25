import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})
export class HomeComponent implements OnInit {


  usuarioLogado: boolean = false;
 
  constructor() {
    
  }

  ngOnInit(): void {
   this.verificarSeExisteAlguemLogado();
   
  }

  verificarSeExisteAlguemLogado(): void{
    if(localStorage.length != 0){
      this.usuarioLogado = true;
    }
  }

}
