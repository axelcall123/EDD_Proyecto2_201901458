import { listaSimple } from "./lSimple.js"
export class Hash{
    constructor(max/*porcentaje*/,tam){
        this.max=max
        this.tam=tam
        this.array=[this.tam]
        this.serial=false
        this.llenado=0//densidad lleando
    }
    SeriaLizar(){
        for(var i=0;i<this.tam;i++){
            this.array[i]=null
        }
    }
    incertar(info){
        if(this.serial==false){
            this.SeriaLizar() 
            this.serial=true
        }
        //crear
        let id=info%this.tam
        if(this.array[id]==null){//crear nuevo
            this.array[id]=new listaSimple()
            this.array[id].insertarU(info)
            this.llenado++
        }else{//
            this.array[id].insertarU(info)
        }
        if(this.llenado/this.tam>this.max){//REHASHING
            this.rehashing()
        }
    }
    rehashing(){
        let tamAux = this.tam
        let arrayAux = [tamAux]
        for (var i = 0; i < tamAux; i++){
            arrayAux[i]=this.array[i]
        }
        this.tam=tamAux*5
        this.llenado=0
        this.serial = false
        for(var i=0;i<tamAux;i++){
            if (arrayAux[i] != null) {
                while (arrayAux[i].vacio() != true) {
                    this.incertar(arrayAux[i].pop())
                }
            }
        }
        console.log()
    }
}
