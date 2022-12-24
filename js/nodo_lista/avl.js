import { NodoB } from "./Nodo.js"
import { listaSimple } from "./lSimple.js"
import { Estrella } from "../func/func.js"
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
                if (info.GetDatos()["id_pelicula"] < tmp.izquierda.info.GetDatos()["id_pelicula"]) tmp = this.srl(tmp)
                else tmp = this.drl(tmp)
            }
        } else if (info.GetDatos()["id_pelicula"] > tmp.info.GetDatos()["id_pelicula"]) {
            tmp.derecha = this.add(info, tmp.derecha)
            if ((this.tam(tmp.derecha) - this.tam(tmp.izquierda)) == 2) {
                if (info.GetDatos()["id_pelicula"] > tmp.derecha.info.GetDatos()["id_pelicula"]) tmp = this.srr(tmp)
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
    drl(nodo) {
        nodo.izquierda = this.srr(nodo.izquierda)
        return this.srl(nodo)
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
    drr(nodo) {
        nodo.derecha = this.srl(nodo.derecha)
        return this.srr(nodo)
    }
    preorden(){
        this.pre_orden(this.raiz)
    }
    pre_orden(nodo) {
        if (nodo != null) {
            console.log(nodo.info)
            this.preorden(nodo.izquierda)
            this.preorden(nodo.derecha)
        }
    }
    inorden() {
        this.in_orden(this.raiz)
    }
    in_orden(nodo) {
        if (nodo != null) {
            this.inorden(nodo.izquierda)
            console.log(nodo.info)
            this.inorden(nodo.derecha)
        }
    }
    postorden() {
        this.pos_torden(this.raiz)
    }
    pos_torden(nodo) {
        if (nodo != null) {
            this.postorden(nodo.izquierda)
            this.postorden(nodo.derecha)
            console.log(nodo.info)
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
        let elementoL1 =new listaSimple()//<main page>
        let elementoL2 =new listaSimple()//<pelicula punto>
        let elementoL3 =new listaSimple()//<pelicula comentarios{c1,c2}>
        let elementoL4 =new listaSimple()//<pelicula publicar>
        let idL=new listaSimple()
        function gNIn_orden(nodo) {
            if (nodo != null) {
                gNIn_orden(nodo.izquierda);
                let nombre = nodo.info.GetDatos()["nombre_pelicula"]
                let descripcion = nodo.info.GetDatos()["descripcion"]
                let precio = nodo.info.GetDatos()["precion_Q"]
                let id=nodo.info.GetDatos()["id_pelicula"]
                //main pelis
                //button main main pelicula info
                //b-mpp-alq- button main pelicula alquilar
                var elementoT1 = 
                `   <div class="col-md-12">
                        <div class="row">
                            <div class="col-sm-3">
                                <div class="titulo-pelicula center-text">
                                    TITULO:
                                    ${nombre}
                                </div>
                            </div>
                            <div class="col-sm-5 justify-text">
                                <p><b>DES:</b>${descripcion}</p>
                            </div>
                            <div class="col-sm-4">
                                <div class="row">
                                    <div class="col-sm-4">
                                        <button class="b-m-pay" id="b-mmp-info-${id}">
                                            <i class="bi bi-info-circle-fill"></i>
                                            info
                                        </button>
                    
                                    </div>
                                    <div class="col-sm-4">
                                        <button class="b-m-pay" id="b-mpp-alq-${id}">
                                            <i class="bi bi-bag-check-fill"></i>
                                            alquilar
                                        </button>
                                    </div>
                                    <div class="col-sm-4">
                                        Q0${precio}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
                //puntos estrellas
                let estrella = Estrella(nodo.info.GetDatos()["puntuacion_star"])
                //b-mpp-modificar- button main pelicula modificar
                //b-mpp-alq- button main pelicula alquilar
                var elementoT2 = 
                `
                    <h3 class="center-text">${nombre}</h3>
                    <p class="justify-text"><b>Descripcion:</b>${descripcion}</p>
                    <div class="col-sm-3"></div>
                    <div class="col-sm-9">
                        <div class="row">
                            <div class="col-sm-6">
                                <button class="my-btn-d" id="b-mpp-modificar-${id}">Modificar puntuacion</button>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="puntuacion">
                            </div>
                            <div class="col-sm-3">
                                <p>
                                    <b class="starY">${estrella["es"]}</b>
                                    <b class="starB">${estrella["nes"]}</b>
                                </p>
                            </div>
                            <div class="col-sm-3"></div>
                            <div class="col-sm-6">
                                <button class="b-m-pay" id="b-mpp-alq-${id}">
                                    <i class="bi bi-bag-check-fill"></i>
                                    alquilar
                                </button>
                                <p>Q${precio}</p>
                            </div>
                            <div class="col-sm-3"></div>
                        </div>
                    </div>
                    <div class="col-sm-3"></div>
                `
                //p publicaciones
                /*var elementoT3=
                `

                `*/
                //i-mpp-publicar- input main pelicula pelicula publicar
                //b-mpp-publicar- button main pelicula pelicula publicar
                var elementoT4 =
                `
                    <div class="col-md-8">
                        <input type="text" class="float-r" id="i-mpp-publicar-${id}">
                    </div>
                    <div class="col-md-4">
                        <button class="my-btn-u" id="b-mp-publicar" id="b-mpp-publicar-${id}">Publicar</button>
                    </div>
                `
                idL.insertarP(id)
                elementoL1.insertarP(elementoT1)
                elementoL2.insertarP(elementoT2)
                elementoL3.insertarP(nodo)
                elementoL4.insertarP(elementoT4)
                gNIn_orden(nodo.derecha);
            }
        }
        gNIn_orden(this.raiz)
        return { 
            elementou: elementoL1,
            elementod:elementoL2,
            elmenton:elementoL3,
            elementoc:elementoL4,
            id:idL
        }
    }
    buscar(id){
        this._buscar(this.raiz,id)
    }
    _buscar(nodo,id){
        if(nodo!=null){
            if (id == nodo.info.GetDatos()["id_pelicula"]) {
                return nodo
            }
            else if (id < nodo.info.GetDatos()["id_pelicula"]) {
                this._buscar(nodo.izquierda)
            } else if (id > nodo.info.GetDatos()["id_pelicula"]) {
                this._buscar(nodo.derecha)
            }
        }
        return null
    }
}