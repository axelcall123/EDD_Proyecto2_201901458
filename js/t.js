import { Merkle } from "./nodo_lista/merkle.js"

const btn = document.getElementById('add')
let detener=true
var deletes=null
let intervalo=1000
// start()
let str=`
digraph AVL{
nodo_5 [label="id:5
n:n5"]
nodo_3 [label="id:3
n:n3"]
nodo_4 [label="id:4
n:n4"]
nodo_1 [label="id:1
n:n1"]
nodo_2 [label="id:2
n:n2"]
nodo_4->nodo_5
nodo_4->nodo_3
nodo_2->nodo_4
nodo_2->nodo_1
}
`
btn.addsEventListener('click', (e) => {
    // if(detener==true) {
    //     start();
    //     detener=false}
    // else{
    //     stop();
    //     detener=true}
    // download(window.URL.createObjectURL(new Blob(['code of inline SVG'], { type: 'image/png' })), 'img'); 
    // downloadPNG()
    // stop()
    let type=d3.select("#lienzo")
        .graphviz()
        .width(600)
        .height(400)
        .renderDot(str)

    saveSvgAsPng(d3.select('svg').node(), 'myDrawing.png');
})

function start(){
     deletes= setInterval(a, intervalo)
}
function stop(){
    clearInterval(deletes)
    intervalo=intervalo*1.5
    start()
}
let con = 0
function a() {
    console.log(`hi ${con}->${intervalo}`)
    //lienzo
    con++
}
function download(href, name) {
    var a = document.createElement('a');

    a.download = name;
    a.href = href;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}