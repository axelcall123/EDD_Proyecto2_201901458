import { NodoB } from "./Nodo.js"
import { listaSimple } from "./lSimple.js"
export class AVL {
    constructor() {
        this.raiz = null
    }
    insertar(info) {
        this.raiz = this.add(info, this.raiz)
    }
    add(info, tmp) {
        if (tmp == null) { return new NodoB(info) } 
        else if (info.GetDatos()["id_pelicula"]==tmp.info.GetDatos()["id_pelicula"]){
            return null
        }
        else if (info.GetDatos()["id_pelicula"] < tmp.info.GetDatos()["id_pelicula"]) {
            tmp.izquierda = this.add(info, tmp.derecha)
            if ((this.tam(tmp.izquierda) - this.tam(tmp.derecha)) == 2) {
                if (info < tmp.izquierda.info) tmp = this.srl(tmp)
                else tmp = this.drl(tmp)
            }
        } else if (info > tmp.info) {
            tmp.derecha = this.add(info, tmp.derecha)
            if ((this.tam(tmp.derecha) - this.tam(tmp.izquierda)) == 2) {
                if (info > tmp.derecha.info) tmp = this.srr(tmp)
                else tmp = this.drr(tmp)
            }
        }

        var der = this.tam(tmp.derecha)
        var iz = this.tam(tmp.izquierda)
        var maximo = this.max(der, iz)
        tmp.peso = maximo + 1
        return tmp
    }
    tam(tmp) {
        if (tmp == null) return -1
        return tmp.peso
    }
    max(val1, val2) {
        if (val1 > val2) return val1
        return val2
    }
    srl(t1) {
        var t2
        t2 = t1.izquierda
        t1.izquierda = t2.derecha
        t2.derecha = t1
        t1.peso = max(this.tam(t1.izquierda), this.tam(t1.derecha)) + 1
        t2.peso = max(this.tam(t2.izquierda), t1.peso) + 1
        return t2
    }
    drl(tmp) {
        tmp.izquierda = this.srr(tmp.izquierda)
        return this.srl(tmp)
    }
    srr(t1) {
        var t2
        t2 = t1.derecha
        t1.derecha = t2.izquierda
        t2.izquierda = t1
        t1.peso = this.max(this.tam(t1.izquierda), this.tam(t1.derecha)) + 1
        t2.peso = this.max(this.tam(t2.derecha), t1.peso) + 1
        return t2
    }
    drr(tmp) {
        tmp.derecha = this.srl(tmp.derecha)
        return this.srr(tmp)
    }
    preorden(){
        this.pre_orden(this.raiz)
    }
    pre_orden(nodo) {
        if (tmp != null) {
            console.log(tmp.info)
            this.preorden(tmp.izquierda)
            this.preorden(tmp.derecha)
        }
    }
    inorden() {
        this.in_orden(this.raiz)
    }
    in_orden(nodo) {
        if (tmp != null) {
            this.inorden(tmp.izquierda)
            console.log(tmp.info)
            this.inorden(tmp.derecha)
        }
    }
    postorden() {
        this.pos_torden(this.raiz)
    }
    pos_torden(nodo) {
        if (tmp != null) {
            this.postorden(tmp.izquierda)
            this.postorden(tmp.derecha)
            console.log(tmp.info)
        }
    }
    graphviz() {
        let pilaNodo = new listaSimple()//
        let pilaUnion = new listaSimple()//
        function gNPre_orden(nodoAnt, nodo) {
            if (nodo != null) {
                let id = nodo.info.GetDatos()["id_pelicula"]
                let nombre = nodo.info.GetDatos()["nombre_pelicula"]
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
    GetHtml(){
        let elementoL1 = new listaSimple()//<>
        let elementoL2 = new listaSimple()//<>
        let idL=new listaSimple()
        function gNIn_orden(nodo) {
            if (nodo != null) {
                gNIn_orden(nodo.izquierda);
                let nombre = nodo.info.GetDatos()["nombre_pelicula"]
                let descripcion = nodo.info.GetDatos()["descripcion"]
                let precio = nodo.info.GetDatos()["precion_Q"]
                let id=nodo.info.GetDatos()["id_pelicula"]
                var elementoT1 = `
                <div class="col-md-12">
                <div class="row">
                    <div class="col-sm-3">
                        <div class="titulo-pelicula center-text">
                            TITULO:
                            ${nombre}
                        </div>
                    </div>
                    <div class="col-sm-5 justify-text">
                        <p><b>DESCRIPCION:</b>${descripcion}</p>
                    </div>
                    <div class="col-sm-4">
                        <div class="row">
                            <div class="col-sm-4">
                                <button class="b-m-pay" id="b-mm-pel-info-${id}">
                                    <i class="bi bi-info-circle-fill"></i>
                                    info
                                </button>
    
                            </div>
                            <div class="col-sm-4">
                                <button class="b-m-pay" id="b-mm-pel-alquilar-${id}">
                                    <i class="bi bi-bag-check-fill"></i>
                                    alquilar
                                </button>
                            </div>
                            <div class="col-sm-4">
                                Q${precio}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                `
                var elementoT2 = `
                    
                `
                idL.insertarP(id)
                elementoL1.insertarP(elementoT1)
                gNIn_orden(nodo.derecha);
            }
        }
        gNIn_orden(this.raiz)
        return { elementou: elementoL1,id:idL}
    }
}