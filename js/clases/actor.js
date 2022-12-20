export class Usuario {
    constructor(dni,nombre_actor,correo,descripcion) {
        this.dni = dni
        this.nombre_actor = nombre_actor
        this.correo = correo
        this.descripcion = descripcion
    }
    GetDatos() {
        return {
            dni : this.dni,
            nombre_actor : this.nombre_actor,
            correo : this.correo,
            descripcion : this.descripcion
        }
    }
}