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
        let id = info.GetDatos()["id_categoria"]%this.tam
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
        for(var i=0;i<tamAux;i++){//recorre arbol lo re incerta
            if (arrayAux[i] != null) {
                while (arrayAux[i].vacio() != true) {
                    this.incertar(arrayAux[i].pop())
                }
            }
        }
    }
    graphviz(){
        let box = "shape=box"
        let contNodo = ""//nodo_1[]
        let unionNodoSig = ""//nodo_1->nodo->2
        let unionNodoAb = ""
        let rank = "{rank=same"//{rank=same;nodo_1;nodo_2}
        let pilaUNodoS = new listaSimple()//sig->sig->
        let pilaRank = new listaSimple()//rank=same
        for (var i = 0; i < this.tam; i++) {//abajo

            if(this.array[i]==null){//[x]
                contNodo = contNodo + `nodo_${i} [${box} label="X"]\n`
                rank=rank+`;nodo_${i}`
            }else{
                unionNodoSig = unionNodoSig + `nodo_${i}->`//der
                contNodo=contNodo+`nodo_${i} [${box} label=" "]\n`
                rank = rank + `;nodo_${i}`

                let lsAux=this.array[i]
                let nodo=lsAux.mostrar(null)
                let cont1 = 0
                while(nodo!=null){
                    let company=nodo.info.GetDatos()["company"]
                    contNodo = contNodo + `nodo_${i}_${cont1} [${box} label="${company}"]\n`
                    rank = rank + `;nodo_${i}_${cont1}`
                    nodo = lsAux.mostrar(nodo)
                    if (nodo!= null) {//ultimo para ver
                        unionNodoSig = unionNodoSig + `nodo_${i}_${cont1}->`//der
                    } else {
                        unionNodoSig = unionNodoSig + `nodo_${i}_${cont1}`//der
                    }                    
                    cont1++
                }
                
            }

            rank = rank + "}"
            if (unionNodoSig!=""){//no haya mucho espacios
                pilaUNodoS.push(unionNodoSig + "\n")
            }
            
            pilaRank.push(rank + "\n")

            //default
            rank = "{rank=same"
            unionNodoSig = ""
            if (i < this.tam - 1) {//unir abajo
                unionNodoAb = unionNodoAb + `nodo_${i}->`
            } else {//evitar errores
                unionNodoAb = unionNodoAb + `nodo_${i}`
            }
            
        }
        var union1 = ""
        while (pilaUNodoS.vacio() != true) {
            union1 = union1 + pilaUNodoS.pop()
        }
        while (pilaRank.vacio() != true) {
            union1 = union1 + pilaRank.pop()
        }
        let contenido = contNodo + union1 + unionNodoAb
        let codigodot = `digraph HASH{
            ${contenido}
        }`
        console.log(codigodot)
        return codigodot
    }
}
