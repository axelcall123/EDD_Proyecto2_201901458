
const btn = document.getElementById('add')
let detener=true
var deletes=null
btn.addEventListener('click', (e) => {
    if(detener==true) {start();detener=false}
    else{stop();detener=true}
})

function start(){
     deletes= setInterval(a, 1000)
}
function stop(){
    clearInterval(deletes)
}

let con = 0
function a() {
    console.log(`hi ${con}`)
    con++
}
