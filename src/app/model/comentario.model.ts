import { Post } from './post.model';
import { Usuario } from './usuario.model';

export class Comentario {

    id: number;
    comentario: string;
    postId: Post;
    usuarioId: Usuario;
}