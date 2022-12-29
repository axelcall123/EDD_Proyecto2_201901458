import { NodoB } from "./Nodo.js";
import { listaSimple } from "./lSimple.js";
import { hash } from "../func/func.js";
export class Merkle{
    constructor(){
        this.raiz=null
        this.matriz=new listaSimple()
        this.id=1
        this.rootHash=""
    }
    addLS(info){
        this.matriz.insertarU(info)
    }
    crear(){
        let nivel=0;
        while(this.matriz.tam()>Math.pow(2,nivel)){
            nivel++
        }
        this.crearT(nivel)
        this.rootHash =this.TopHash(this.raiz)
        //console.log(this.rootHash)
    }
    crearT(nivel){
        this.raiz=new NodoB("$T")
        this.raiz.id=this.id
        this.id++
        this._crearT(nivel,this.raiz)
    }
    _crearT(nivel,nodo){
        if(nivel>=1){//para crear niveles
            nodo.izquierda = new NodoB(`S${nivel}I`)
            nodo.izquierda.id = this.id
            this.id++
            
            nodo.derecha = new NodoB(`S${nivel}D`)
            nodo.derecha.id = this.id
            this.id++

            this._crearT(nivel - 1, nodo.derecha)
            this._crearT(nivel - 1, nodo.izquierda)
        }else if(nivel==0){
            if(this.matriz.vacio()!=true){//sacar el hash
                nodo.info=this.matriz.pop()
            }else{//si me quede sin info; añado mas
                nodo.info="0"
            }
        }
    }
    TopHash(nodo){//post order iz,der,info
        if(nodo!=null){
            let strD = this.TopHash(nodo.derecha);//return hash
            let strI = this.TopHash(nodo.izquierda);//return hash
            //console.log("Valor:", nodo.info);
            if(nodo.derecha!=null && nodo.izquierda!=null){//hojas superiores
                nodo.info = hash(strI + strD+nodo.info)
                return nodo.info
            }else{//hoja mas baja
                nodo.info=hash(nodo.info)
                return nodo.info
            }
        }
    }
    graphviz() {
        let pilaNodo = new listaSimple()//
        let pilaUnion = new listaSimple()//
        let box = "shape=box"
        function gNPre_orden(nodoAnt, nodo) {
            if (nodo != null) {
                let hash = nodo.info.substr(0, 6)
                pilaNodo.push(`nodoM_${nodo.id} [${box} label="h:${hash}"]\n`)
                if (nodoAnt != "") {//dif primer nodo
                    pilaUnion.push(`${nodoAnt}->nodoM_${nodo.id}\n`)
                }
                gNPre_orden(`nodoM_${nodo.id}`, nodo.izquierda);
                gNPre_orden(`nodoM_${nodo.id}`, nodo.derecha);
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
        let codigodot = `subgraph MERK{
            ${contenido}
        }`
        return codigodot
    }
    GetRoot(){
        return this.rootHash
    }
}
/*
let text="12345678"
let result=text.substr(0,6) 
console.log(result)
*/