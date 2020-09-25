import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcessoComponent } from './acesso/acesso.component'
import {  HomeComponent } from './home/home.component'
import { PostComponent } from './home/post/post.component';

const routes: Routes = [
  { path: '', component:  HomeComponent },
  { path: 'login', component:  AcessoComponent },
  { path: 'post', component:  PostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
