let logUser=null
let strTrans=""//TODO:block
let strTsaltos = ""//TODO:block
let time = 300//TODO:block;;300seg
//IMPORTS
    //CLASES
import { Cliente } from "./clases/cliente.js";
import { Pelicula } from "./clases/pelicula.js";
import { Actor } from "./clases/actor.js";
import { Categoria } from "./clases/categoria.js";
import { HH } from "./clases/hh.js";//TODO:block
    //FUNC
import { hash } from "./func/func.js";
import { blockChain } from "./func/func.js";
    //LISTAS
import { listaSimple } from "./nodo_lista/lSimple.js";
const lsUsuario=new listaSimple()
const lsBlock = new listaSimple()//TODO:block
import { ABB } from "./nodo_lista/binario.js";
const abActor=new ABB()
import { AVL } from "./nodo_lista/avl.js";
const avPelicula=new AVL()
import { Hash } from "./nodo_lista/hash.js";
const hCategoria=new Hash(0.75,20)
import { Merkle } from "./nodo_lista/merkle.js";
const merk=new Merkle()
//OCULTOS
const ocultoPageLogin = document.getElementById('d-login')

const ocultoPageMaster = document.getElementById('d-admin')
ocultoPageMaster.style.display = 'none';

const ocultoPMBlock = document.getElementById('d-a-block')
ocultoPMBlock.style.display = 'none';

const ocultoPMFiles = document.getElementById('d-a-files');
ocultoPMFiles.style.display = 'none';

const ocultoPageMain=document.getElementById('d-main-page')
ocultoPageMain.style.display = 'none';

const ocultoNav = document.getElementById('nav');
ocultoNav.style.display = 'none';

const ocultoMain = document.getElementById('d-m-main')
ocultoMain.style.display = 'none';

const ocultoPelicula = document.getElementById('d-m-pelicula')
ocultoPelicula.style.display = 'none';
//BOTONES
    //OUT 
const btnOutAd = document.getElementById('b-out-admin')
const btnOutMa = document.getElementById('b-out-main')
const btnOutBl = document.getElementById('b-out-block')
    //MENU-BLOCK 
const btnABlock = document.getElementById('b-a-block')  
    //MENU-GENERAR 
const btnGenerarBlock = document.getElementById('b-a-generar')
    //MENU-LOGIN
const btnLogin = document.getElementById('b_login')
    //MAIN-FILES
const btnAFPelicula = document.getElementById('b-a-f-pelicula')
const btnAFCliente = document.getElementById('b-a-f-cliente')
const btnAFActor = document.getElementById('b-a-f-actor')
const btnAFCategoria=document.getElementById('b-a-f-categoria')
    //MAIN-GRAPHIZ b-a-g-categoria
const btnAGPelicula = document.getElementById('b-a-g-pelicula')
const btnAGCliente = document.getElementById('b-a-g-cliente')
const btnAGActor = document.getElementById('b-a-g-actor')
const btnAGCategoria = document.getElementById('b-a-g-categoria')

var usuario = new Cliente(); 
usuario.SetAll(2354168452525,
    "Oscar Armin",
    "EDD",
    "a@gmail.com",
    hash("123"),
    12345678)
//FUNCIONES BOTONES
    //LOGIN
let addAdmin=true
btnLogin.addEventListener('click', (e) => {
    e.preventDefault()
    if (addAdmin == true) {//crear default user
        lsUsuario.insertarP(usuario);
        addAdmin = false
    }
    let log = lsUsuario.buscar(i_userL.value, hash(i_passL.value), l_checkbox.checked)
    logUser = log["nodo"]
    if (log["TF"]) {//COINCIDENCIA
        if (l_checkbox.checked) {//si es admin pagina master
            //ocultar,mostrar
            ocultoPageLogin.style.display = "none";
            ocultoPageMaster.style.display = "block";
            ocultoPMFiles.style.display = 'block';
        } else {//no admin main page
            ocultoPageLogin.style.display = "none";
            ocultoNav.style.display = 'block';
            ocultoPageMain.style.display = 'block';
            //log user
            var padre = document.getElementById("log-user")//elimina hijos
            while (padre.firstChild) {
                padre.firstChild.remove()
            }
            document.getElementById('log-user').insertAdjacentHTML('beforeend', logUser.info.GetDatos()["nombre_usuario"])
            //display
            ocultoMain.style.display = 'block';
            //crear dinamicamente todo
            padre = document.getElementById("d-mm-pel")//elmina hijos
            while (padre.firstChild) {
                padre.firstChild.remove()
            }

            let listaAux = avPelicula.GetHtml()
            while (listaAux["id"].vacio()!=true){//peliculas
                //depliego user por id
                let idT = listaAux["id"].pop()
                //despliego <elemento peliculas>
                document.getElementById("d-mm-pel").insertAdjacentHTML('beforeend', listaAux["elementou"].pop())
                //id btn;;info get id
                let btnTemp = document.getElementById(`b-mmp-info-${idT}`)                
                btnTemp.addEventListener('click', (e) => {
                    //display page peliculas
                    var padre = document.getElementById("d-mp-punto")//elimina hijos
                    while (padre.firstChild) {
                        padre.firstChild.remove()
                    }
                    padre = document.getElementById("d-mp-publicar")//elimina hijos
                    while (padre.firstChild) {
                        padre.firstChild.remove()
                    }
                    //
                    let info = avPelicula.GetHtmlD(parseInt(e.target.id.replace("b-mmp-info-", "")))
                    //oculto main
                    ocultoMain.style.display = 'none';
                    //muestro peliculas
                    ocultoPelicula.style.display = 'block';
                    //puntos estrellas
                    document.getElementById("d-mp-punto").insertAdjacentHTML('beforeend', info["elementou"])
                    //input, button publicar
                    document.getElementById("d-mp-publicar").insertAdjacentHTML('beforeend', info["elementod"])
                    //display comentarios
                    let auxComentario = info["elmenton"].info.GetComentario()//un nodo.info.GetComentario()
                    let nodo = auxComentario.mostrar(null)
                    padre = document.getElementById("d-mp-comentario")//elimina hijos
                    while (padre.firstChild) {
                        padre.firstChild.remove()
                    }
                    while (nodo != null) {//mostrar una uno->nodo
                        nodo = auxComentario.mostrar(nodo)
                        document.getElementById("d-mp-comentario").insertAdjacentHTML('beforeend', `<p class="center-text">${nodo.info}</p>`)
                    }
                    
                })
                //id btn;;alquilar
                btnTemp = document.getElementById(`b-mpp-alq-${idT}`)
                btnTemp.addEventListener('click', (e) => {
                    //alquilar user nombre;pelicula
                    //convetir id a float
                    let peli=avPelicula.buscar(parseInt(e.target.id.replace("b-mpp-alq-","")))
                    let nombrePeli = peli.info.GetDatos()["nombre_pelicula"]
                    let nombreUser = logUser.info.GetDatos()["nombre_usuario"]
                    strTrans = strTrans + `${nombreUser}-${nombrePeli}`//uno el mekle
                    strTsaltos = strTsaltos + `${nombreUser}-${nombrePeli}\n`
                    merk.addLS(`${nombreUser}-${nombrePeli}`)
                })
                //id btn;modificar puntuacion
                btnTemp = document.getElementById(`b-mpp-modificar-${idT}`)
                btnTemp.addEventListener('click', (e) => {
                    //modificar
                    let ids=parseInt(e.target.id.replace("b-mpp-modificar-", ""))//solo id
                    let peli = avPelicula.buscar(ids)//nodo
                    const inpModificar = document.getElementById(`i-mpp-es-${ids}`).value//get txt input
                    let estrella = Estrella(inpModificar)//tengo la estrellas txt

                    padre = document.getElementById("d-mpp-es-${ids}")//elimina hijos
                    while (padre.firstChild) {
                        padre.firstChild.remove()
                    }
                    peli.info.SetPuntuacion(parseInt(inpModificar))
                    document.getElementById("d-mpp-es-${ids}").insertAdjacentHTML('beforeend', `
                        <p>
                            <b class="starY">${estrella["es"]}</b>
                            <b class="starB">${estrella["nes"]}</b>
                        </p>
                    `)
                })
                //id btn,publicar
                btnTemp = document.getElementById(`b-mpp-publicar-${idT}`)
                btnTemp.addEventListener('click', (e) => {
                    //publicar 
                    let peli = avPelicula.buscar(parseInt(e.target.id.replace("b-mpp-publicar-", "")))//nodo(id)
                    let input = document.getElementById(`i-mpp-publicar-${id}`).value//get txt input

                    peli.info.GetComentario().push(input)//comentario
                    //main page comentario                    
                    padre = document.getElementById("d-mp-comentario")//elimina hijos
                    while (padre.firstChild) {
                        padre.firstChild.remove()
                    }
                    while (auxComentario.GetComentario().mostrar(nodo) != null) {//mostrar una uno->nodo
                        nodo = auxComentario.GetComentario().mostrar(nodo)
                        document.getElementById("d-mp-comentario").insertAdjacentHTML('beforeend', `<p class="center-text">${nodo.info}</p>`)
                    }
                })
            }
            
        }
    } else {//contram,user,admin esta mal
        //no ingreso
    }
})
btnABlock.addEventListener('click', (e) => {
    ocultoPMFiles.style.display = 'none';
    ocultoPMBlock.style.display = 'block';
    //mostrar grafica
    merk.crear()
    d3.select("#d-a-merkle")
        .graphviz()
        .width(600)
        .height(400)
        .renderDot(merk.graphviz())
    
        
})
    //OUT
btnOutAd.addEventListener('click', (e) => {
    ocultoPageMaster.style.display = 'none';
    ocultoPMBlock.style.display = 'none';
    ocultoPMFiles.style.display = 'none'; 
    ocultoPageLogin.style.display = 'block';
})
btnOutMa.addEventListener('click', (e) => {
    ocultoNav.style.display = 'none';
    ocultoPageMain.style.display = 'none';
    ocultoMain.style.display = 'none';
    ocultoPageLogin.style.display = 'block';
})
btnOutBl.addEventListener('click', (e) => {
    ocultoPMBlock.style.display = 'none';
    ocultoPMFiles.style.display = 'block';
})
    //MENU-GENERAR
btnGenerarBlock.addEventListener('click', (e) => {
    let today = new Date();
    let now = today.toLocaleString();
    
    
    if (lsBlock.tam() == 0) {//primer bloque
        //index,time,previous,root
        let strHash = blockChain(strTrans, now, "", merk.GetRoot())//funcion=>hash
        //hash,prev,root,transact,date
        let bloque = new HH(strHash, "", merk.GetRoot(), strTsaltos, now)//clase
        lsBlock.insertarU(bloque)
    }else{//n bloque        
        //index,time,previous,root
        let nodoInf = lsBlock.GetUltimo()//lista=>nodo.info
        let previo = nodoInf.GetDatos()["hash"]
        let strHash = blockChain(strTrans, now,previo , merk.GetRoot())//funcion=>hash
        //hash,prev,root,transact,date
        let bloque = new HH(strHash, previo, merk.GetRoot(), strTsaltos, now)//clase
        lsBlock.insertarU(bloque)
    }
    strTrans =""
    strTsaltos =""
})
    //FILE-PELICULAS
let inpAFPelicula = document.createElement('input'); inpAFPelicula.type = 'file';
btnAFPelicula.addEventListener('click', (e) => {
    e.preventDefault()
    //inpAFPelicula.addEventListener('change',funcFile(new Pelicula(),"pel"),false)
    inpAFPelicula.click();
    inpAFPelicula.remove();
})
inpAFPelicula.addEventListener('change', function () {//cambia (e)=> a funciont()
    var fr = new FileReader();
    fr.onload = function () {
        const jsonObj = JSON.parse(fr.result)
        jsonObj.forEach(element => {
            let clase=new Pelicula(
                parseInt(element["id_pelicula"]),
                element["nombre_pelicula"],
                element["descripcion"],
                parseInt(element["puntuacion"]),
                parseInt(element["precion_Q"]),
                parseInt(element["paginas"]),
                element["categoria"]
            )
            avPelicula.insertar(clase)
        });
    }
    fr.readAsText(this.files[0])
})
    //FILE-CLIENTES
let inpAFCliente = document.createElement('input'); inpAFCliente.type = 'file';
btnAFCliente.addEventListener('click', (e) => {
    e.preventDefault()
    //inpAFPelicula.addEventListener('change',funcFile(new Pelicula(),"pel"),false)
    inpAFCliente.click();
    inpAFCliente.remove();
})
inpAFCliente.addEventListener('change', function () {//cambia (e)=> a funciont()
    var fr = new FileReader();
    fr.onload = function () {
        const jsonObj = JSON.parse(fr.result)
        jsonObj.forEach(element => {
            let clase = new Cliente(
                parseInt(element["dpi"]),
                element["nombre_completo"],
                element["nombre_usuario"],
                element["correo"],
                hash(element["contrasenia"]),
                element["telefono"]
            )
            lsUsuario.insertarU(clase)
        });
    }
    fr.readAsText(this.files[0])
})
    //FILE-ACTORES
let inpAFActor = document.createElement('input'); inpAFActor.type = 'file';
btnAFActor.addEventListener('click', (e) => {
    e.preventDefault()
    //inpAFActor.addEventListener('change',funcFile(new Pelicula(),"pel"),false)
    inpAFActor.click();
    inpAFActor.remove();
})
inpAFActor.addEventListener('change', function () {//cambia (e)=> a funciont()
    var fr = new FileReader();
    fr.onload = function () {
        const jsonObj = JSON.parse(fr.result)
        jsonObj.forEach(element => {
            let clase = new Actor(
                parseInt(element["dni"]),
                element["nombre_actor"],
                element["correo"],
                element["descripcion"])
            abActor.insertar(clase) 
        });
    }
    fr.readAsText(this.files[0])
})
    //FILES-CATEGORIAS
let inpAFCategoria = document.createElement('input'); inpAFCategoria.type = 'file';
btnAFCategoria.addEventListener('click',(e)=> {
    e.preventDefault()
    //inpAFCategoria.addEventListener('change',funcFile(new Pelicula(),"pel"),false)
    inpAFCategoria.click();
    inpAFCategoria.remove();
})
inpAFCategoria.addEventListener('change', function () {
    var fr = new FileReader();
    fr.onload = function () {
        const jsonObj = JSON.parse(fr.result)
        jsonObj.forEach(element => {
            let clase = new Categoria(
                parseInt(element["id_categoria"]),
                element["company"]
            )
            hCategoria.incertar(clase)
        });
    }
    fr.readAsText(this.files[0])
})
    //GRAHPVIZ-PELICULAS
btnAGPelicula.addEventListener('click', (e) => {
    /*const padre = document.getElementById("b-MGraph")//remover graphviz
    while (padre.firstChild) {
        padre.firstChild.remove()
    }*/
    d3.select("#d-graph-scroll")
    .graphviz()
    .width(600)
    .height(400)
    .renderDot(avPelicula.graphviz())
})
    //GRAHPVIZ-CLIENTES
btnAGCliente.addEventListener('click', (e) => {
    /*const padre = document.getElementById("b-MGraph")//remover graphviz
    while (padre.firstChild) {
        padre.firstChild.remove()
    }*/
    d3.select("#d-graph-scroll")
    .graphviz()
    .width(600)
    .height(400)
    .renderDot(lsUsuario.graphvizCt())
})
    //GRAHPVIZ-ACTORES
btnAGActor.addEventListener('click', (e) => {
    /*const padre = document.getElementById("b-MGraph")//remover graphviz
    while (padre.firstChild) {
        padre.firstChild.remove()
    }*/
    d3.select("#d-graph-scroll")
    .graphviz()
    .width(600)
    .height(400)
    .renderDot(abActor.graphviz())
})
    //GRAHPVIZ-CATEGORIAS
btnAGCategoria.addEventListener('click', (e) => {
    /*const padre = document.getElementById("b-MGraph")//remover graphviz
    while (padre.firstChild) {
        padre.firstChild.remove()
    }*/
    d3.select("#d-graph-scroll")
    .graphviz()
    .width(600)
    .height(400)
    .renderDot(hCategoria.graphviz())
})
   

function funcFile(clase,file){
    /*var fr = new FileReader();
    fr.onload = function () {
        const jsonObj = JSON.parse(fr.result)
        jsonObj.forEach(element => {
            if (file == "pel") {//id_pelicula, nombre_pelicula, descripcion, puntuacion, precion_Q, paginas, categoria
                clase.SetAll(
                    parseInt(element["id_pelicula"]),
                    element["nombre_pelicula"],
                    element["descripcion"],
                    parseInt(element["puntuacion"]),
                    parseInt(element["precion_Q "]),
                    parseInt(element["paginas"]),
                    element["categoria"]
                )
                avPelicula.insertar(clase)
            }else if(file=="cli"){
                clase.SetAll(
                    parseInt(element["dpi"]),
                    element["nombre_completo"],
                    element["nombre_usuario"],
                    element["correo"],
                    hash(element["contrasenia"]),
                    element["telefono"]
                )
                lsUsuario.insertarU(clase)
            }
            else if (file=="act") { 
                clase.SetAll(
                parseInt(element["dni"]),
                element["nombre_actor"],
                element["correo"],
                element["descripcion"])
                abActor.insertar(clase) 
            }
            else if (file=="cat") {
                clase.SetAll( 
                parseInt(element["id_categoria"]),
                element["company"])
                //HASH
            }
        });
    }
    fr.readAsText(this.files[0])*/
}