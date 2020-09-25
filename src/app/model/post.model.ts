import { Usuario } from './usuario.model';


export class Post {
    public id: number;
    public titulo: string;
    public texto: string;
    public usuarioId: Usuario;
    public listaLinks: String[];
    public listaImagens: String[];
}