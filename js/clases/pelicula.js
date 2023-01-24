import { listaSimple } from "../nodo_lista/lSimple.js"
export class Pelicula {
    constructor(id_pelicula,nombre_pelicula,descripcion,puntuacion,precion_Q,paginas,categoria) {
        this.id_pelicula = id_pelicula
        this.nombre_pelicula = nombre_pelicula
        this.descripcion = descripcion
        this.puntuacion = puntuacion
        this.precion_Q = precion_Q
        this.paginas = paginas
        this.categoria = categoria
        this.comentario=new listaSimple()
    }
    GetDatos() {
        return {
        id_pelicula:this.id_pelicula,
        nombre_pelicula:this.nombre_pelicula,
        descripcion:this.descripcion,
        puntuacion:this.puntuacion,
        precion_Q:this.precion_Q,
        paginas:this.paginas,
        categoria:this.categoria
        }
    }
    SetAll(id_pelicula, nombre_pelicula, descripcion, puntuacion, precion_Q, paginas, categoria) {
        this.id_pelicula = id_pelicula
        this.nombre_pelicula = nombre_pelicula
        this.descripcion = descripcion
        this.puntuacion = puntuacion
        this.precion_Q = precion_Q
        this.paginas = paginas
        this.categoria = categoria
    }
    SetPuntuacion(puntuacion){
        this.puntuacion=puntuacion
    }
    GetComentario(){return this.comentario}
}
