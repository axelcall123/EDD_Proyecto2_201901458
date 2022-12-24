export class Cliente {
    constructor(dpi, nombre_completo, nombre_usuario,correo,contrasenia,telefono) {
        this.dpi = dpi
        this.nombre_completo = nombre_completo
        this.nombre_usuario = nombre_usuario
        this.correo = correo
        this.contrasenia = contrasenia
        this.telefono = telefono
    }
    GetDatos() {
        return {
        dpi : this.dpi,
        nombre_completo : this.nombre_completo,
        nombre_usuario : this.nombre_usuario,
        correo : this.correo,
        contrasenia : this.contrasenia,
        telefono : this.telefono,
        }
    }
    SetAll(dpi, nombre_completo, nombre_usuario, correo, contrasenia, telefono) {
        this.dpi = dpi
        this.nombre_completo = nombre_completo
        this.nombre_usuario = nombre_usuario
        this.correo = correo
        this.contrasenia = contrasenia
        this.telefono = telefono
    }
}