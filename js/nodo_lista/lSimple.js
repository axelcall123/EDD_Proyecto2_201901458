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

}