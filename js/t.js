import { hash } from "./func/func.js"
import { Hash } from "./nodo_lista/hash.js"
import { AVL } from "./nodo_lista/avl.js"
const btn = document.getElementById('add')
btn.addEventListener('click', (e) => {
    /*let hh=new Hash(0.75,10)
    hh.incertar(0)
    hh.incertar(1)
    hh.incertar(2)
    hh.incertar(3)
    hh.incertar(4)
    hh.incertar(5)
    hh.incertar(15)
    hh.incertar(25)
    hh.incertar(13)
    hh.incertar(6)
    hh.incertar(7)*/
    let a=new AVL()
    a.insertar(1)
    a.insertar(3)
    a.insertar(4)
    a.insertar(5)
    a.insertar(6)
    a.insertar(7)
    a.inorden()
    console.log("------")
    a.Ainorden()
})
