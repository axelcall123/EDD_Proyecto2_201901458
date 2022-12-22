import { Nodo } from './Nodo.js'
export class listaSimple {
    constructor() {
        this.primero = null;
        this.ultimo = null;
        this.tamano = 0;
    }
    insertarP(info) {
        const nuevo = new Nodo(info);
        if (this.primero == null) {
            this.ultimo = nuevo
            this.primero = nuevo
        }
        else {
            nuevo.siguiente = this.primero;
            this.primero = nuevo;
        }
        this.tamano++;
    }
    insertarU(info) {
        const nuevo = new Nodo(info);
        if (this.primero == null) {
            this.ultimo = nuevo
            this.primero = nuevo
        }
        else {
            this.ultimo.siguiente = nuevo;
            this.ultimo = nuevo;
        }
        this.tamano++;
    }
    push(info) {
        this.insertarP(info)
    }
    pop() {
        if (this.primero != null) {
            var temp = this.primero
            this.primero = temp.siguiente
            this.tamano--
            if (this.tamano == 0) { this.ultimo = this.primero }
            return temp.info
        } else {
            return null
        }
    }
    add(info) {
        this.insertarP(info)
    }
    remove() {

        if (this.primero != null) {
            const temp = new Nodo(this.ultimo.info);
            let aux = this.primero
            for (var x = 1; x < this.tamano - 1; x++) {
                aux = aux.siguiente
            }
            aux.siguiente = null
            this.ultimo = aux
            this.tamano--
            if (this.tamano == 0) {
                this.ultimo = null
                this.primero = null
            }
            return temp.info
        } else {
            return null
        }
    }
    vacio() {
        if (this.primero == null) return true
        return false
    }
    tam() {
        return this.tamano
    }
    //SOLO PARA EL LOGIN
    buscar(user, pass) {// json
        var aux = this.primero;
        while (aux != null && user != aux.info.GetDatos()["nombre_usuario"]) {
            //lista.info.usuario
            aux = aux.siguiente;
        }
        if (aux == null) {//LLEGO FINAL
            return {TF: false, nodo: null }
        } else if (pass == aux.info.GetDatos()["contrasenia"]) {//USUARIO Y CONTRA
            return {TF: true, nodo: aux }
        }//CONTRASEÑA MAL | ES NO ES ADMIN
        return { TF: false, nodo: aux }
    }
    graphviz() {
        let aux = this.primero

        let box = "shape=box"

        let contNodo = ""//nodo_1[]
        let unionNodo = ""//nodo_1->nodo->2
        let cont = 0
        while (aux != null) {
            let dpi = aux.info.GetDatos()["dpi"]
            let user = aux.info.GetDatos()["nombre_completo"]
            let pass = aux.info.GetDatos()["contrasenia"]
            contNodo = contNodo + `nodo_${cont} [${box} label="dpi:${dpi}\nus:${user}\npass:${pass}"]\n`
            if (cont < this.tamano - 1) {
                unionNodo = unionNodo + `nodo_${cont}->`
            } else {
                unionNodo = unionNodo + `nodo_${cont}\n`
            }
            cont++
            aux = aux.siguiente
        }
        let contenido = contNodo + unionNodo
        let codigodot = `digraph {
            rankdir=LR
            ${contenido}
        }`
        return codigodot
    }
}