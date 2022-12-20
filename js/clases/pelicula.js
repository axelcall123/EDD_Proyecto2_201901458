export class Usuario {
    constructor(id_pelicula,nombre_pelicula,descripcion,puntuacion,precion_Q,paginas,categoria) {
        this.id_pelicula = id_pelicula
        this.nombre_pelicula = nombre_pelicula
        this.descripcion=descripcion
        this.puntuacion = puntuacion
        this.precion_Q = precion_Q
        this.paginas = paginas
        this.categoria = categoria
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
}
