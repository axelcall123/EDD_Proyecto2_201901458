
const btn = document.getElementById('add')
let detener=true
var deletes=null
import { Merkle } from "./nodo_lista/merkle.js"
btn.addEventListener('click', (e) => {
    // if(detener==true) {start();detener=false}
    // else{stop();detener=true}
    let m=new Merkle()
    m.addLS(1)
  
    m.crear()
    console.log(m.graphviz())
})

// function start(){
//      deletes= setInterval(a, 1000)
// }
// function stop(){
//     clearInterval(deletes)
// }

// let con = 0
// function a() {
//     console.log(`hi ${con}`)
//     con++
// }
