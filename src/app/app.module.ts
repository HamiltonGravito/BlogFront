import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Autenticacao } from './acesso/autenticacao.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AcessoComponent } from './acesso/acesso.component';
import { LoginComponent } from './acesso/login/login.component';
import { CadastroComponent } from './acesso/cadastro/cadastro.component';

@NgModule({
  declarations: [
    AppComponent,
    AcessoComponent,
    LoginComponent,
    CadastroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [Autenticacao],
  bootstrap: [AppComponent]
})
export class AppModule { }
