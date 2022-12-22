import { NodoB } from "./Nodo.js";
import { listaSimple } from "./lSimple.js";
export class ABB {
    constructor() {
        this.raiz = null;
        this.id = 1;
    }
    //metodo insertar
    insertar(info) {
        this.raiz = this.add(info, this.raiz);
    }
    //metodo insertar recursivo
    add(info, nodo) {
        if (nodo == null) {
            let nuevo = new NodoB(info);
            nuevo.id = this.id
            this.id++
            return nuevo
        } else {
            if (info.GetDatos()["dni"] > nodo.info.GetDatos()["dni"]) {
                nodo.derecha = this.add(info, nodo.derecha);
            } else {
                nodo.izquierda = this.add(info, nodo.izquierda);
            }
        }
        return nodo;
    }
    //preorden
    preorden() {
        this.pre_orden(this.raiz);
    }
    pre_orden(nodo) {
        if (nodo != null) {
            console.log("Valor:", nodo.info);
            this.pre_orden(nodo.izquierda);
            this.pre_orden(nodo.derecha);
        }
    }
    //inorden
    inorden() {
        this.in_orden(this.raiz);
    }
    in_orden(nodo) {
        if (nodo != null) {
            this.in_orden(nodo.izquierda);
            console.log("Valor:", nodo.info);
            this.in_orden(nodo.derecha);
        }
    }
    //postorden
    posorden() {
        this.pos_orden(this.raiz);
    }
    pos_orden(nodo) {
        if (nodo != null) {
            this.pos_orden(nodo.izquierda);
            this.pos_orden(nodo.derecha);
            console.log("Valor:", nodo.info);
        }
    }
    graphviz() {
        let pilaNodo = new listaSimple()//
        let pilaUnion = new listaSimple()//
        function gNPre_orden(nodoAnt, nodo) {
            if (nodo != null) {
                let id = nodo.info.GetDatos()["dni"]
                let nombre = nodo.info.GetDatos()["nombre_actor"]
                pilaNodo.push(`nodo_${nodo.id} [label="id:${id}\nn:${nombre}"]\n`)
                if (nodoAnt != "") {//dif primer nodo
                    pilaUnion.push(`${nodoAnt}->nodo_${nodo.id}\n`)
                }
                gNPre_orden(`nodo_${nodo.id}`, nodo.izquierda);
                gNPre_orden(`nodo_${nodo.id}`, nodo.derecha);
            }
        }
        gNPre_orden("", this.raiz)
        let contNodo = ""//nodo_1[]
        let unionNodo = ""//nodo_1->nodo->2
        while (pilaNodo.vacio() != true) {
            contNodo = contNodo + pilaNodo.pop()
        }
        while (pilaUnion.vacio() != true) {
            unionNodo = unionNodo + pilaUnion.pop()
        }
        let contenido = contNodo + unionNodo
        let codigodot = `digraph {
            ${contenido}
        }`
        return codigodot
    }  
}
