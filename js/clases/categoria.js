export class Usuario {
    constructor(id_categoria,company) {
        this.id_categoria = id_categoria
        this.company = company
    }
    GetDatos() {
        return {
            id_categoria : this.id_categoria,
            company : this.company
        }
    }
}