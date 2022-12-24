import { NodoB } from "./Nodo.js";
import { listaSimple } from "./lSimple.js";
import { hash } from "../func/func.js";
class Merkle{
    constructor(){
        this.raiz=null
        this.matriz=new listaSimple()
    }
    addLS(info){
        this.matriz.insertarU(info)
    }
    crear(){
        let nivel=1;
        while(this.matriz.tam()<=Math.pow(2,nivel)){
            nivel++
        }
        this.crearT(nivel)
        let str=this.TopHash(this.raiz)
        console.log(str)
    }
    crearT(nivel){
        this.raiz=new NodoB("$1")
        this._crearT(nivel,this.raiz)
    }
    _crearT(nivel,nodo){
        if(nivel>1){
            nodo.izquierda = new NodoB(`S${nivel}`)
            nodo.derecha = new NodoB(`S${nivel}`)
            this._crearT(nivel - 1, nodo.izquierda)
            this._crearT(nivel - 1, nodo.derecha)
        }else if(nivel==1){
            if(this.matriz.vacio()!=true){//sacar el hash
                nodo=new NodoB(this.matriz.pop())
            }else{//si me quede sin hash
                nodo=new NodoB("0")
            }
        }
    }
    TopHash(nodo){//post order iz,der,info
        if(nodo!=null){
            let strI=this.pos_orden(nodo.izquierda);//return hash
            let strD=this.pos_orden(nodo.derecha);//return hash
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
}
/*
let text="12345678"
let result=text.substr(0,6) 
console.log(result)
*/