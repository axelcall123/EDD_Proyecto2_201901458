let logUser=null
//IMPORTS
    //CLASES
import { Cliente } from "./clases/cliente.js";
import { Pelicula } from "./clases/pelicula.js";
import { Actor } from "./clases/actor.js";
import { Categoria } from "./clases/categoria.js";
    //FUNC
import { hash } from "./func/func.js";
    //LISTAS
import { listaSimple } from "./nodo_lista/lSimple.js";
const lsUsuario=new listaSimple()
import { ABB } from "./nodo_lista/binario.js";
const abActor=new ABB()
import { AVL } from "./nodo_lista/avl.js";
const avPelicula=new AVL()
//OCULTOS
const ocultoPageLogin = document.getElementById('d-login')

const ocultoPageMaster = document.getElementById('d-admin')
ocultoPageMaster.style.display = 'none';

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
    //MENU-LOGIN
const btnLogin = document.getElementById('b_login')

    //MAIN-FILES
const btnAFPelicula = document.getElementById('b-a-f-pelicula')
const btnAFCliente = document.getElementById('b-a-f-cliente')
const btnAFActor = document.getElementById('b-a-f-actor')
// const btnAFCategoria = document.getElementById('b-a-f-categoria')

var usuario = new Cliente(); 
usuario.SetAll(2354168452525,
    "Oscar Armin",
    "EDD",
    "a@gmail.com",
    hash("123"),
    12345678)
//MENU
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
        } else {//no admin main page
            ocultoPageLogin.style.display = "none";
            ocultoNav.style.display = 'block';
            ocultoPageMain.style.display = 'block';
            //display
            ocultoMain.style.display = 'block';
            //crear dinamicamente todo
            var padre = document.getElementById("d-mm-pel")//elmina hijos
            while (padre.firstChild) {
                padre.firstChild.remove()
            }

            let listaAux = avPelicula.GetHtml()
            while (listaAux["id"].vacio()!=true){//peliculas
                //depliego user por id
                let idT = listaAux["id"].pop()
                //despliego <elemento peliculas>
                document.getElementById("d-mm-pel").insertAdjacentHTML('beforeend', listaAux["elementou"].pop())
                //comentarios
                let comentarioL = listaAux["elmenton"].pop()
                //id btn;;info
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
                    //oculto main
                    ocultoMain.style.display = 'none';
                    //muestro peliculas
                    ocultoPelicula.style.display = 'block';
                    //puntos estrellas
                    document.getElementById("d-mp-punto").insertAdjacentHTML('beforeend', listaAux["elementod"].pop())
                    //input, button publicar
                    document.getElementById("d-mp-publicar").insertAdjacentHTML('beforeend', listaAux["elementoc"].pop())
                    //display comentarios
                    let auxComentario = listaAux["elmenton"].pop()//un nodo con info
                    let nodo = null

                    padre = document.getElementById("d-mp-comentario")//elimina hijos
                    while (padre.firstChild) {
                        padre.firstChild.remove()
                    }
                    while (auxComentario.GetComentario().mostrar(nodo) != null) {//mostrar una uno->nodo
                        nodo = auxComentario.GetComentario().mostrar(nodo)
                        document.getElementById("d-mp-comentario").insertAdjacentHTML('beforeend', `<p class="center-text">${nodo.info}</p>`)
                    }
                    
                })
                //id btn;;alquilar
                btnTemp = document.getElementById(`b-mpp-alq-${idT}`)
                btnTemp.addEventListener('click', (e) => {
                    //alquilar

                })
                /*//id btn;modificar puntuacion
                btnTemp = document.getElementById(`b-mpp-modificar-${idT}`)
                btnTemp.addEventListener('click', (e) => {
                    //modificar

                })
                //id btn,publicar
                btnTemp = document.getElementById(`b-mpp-publicar-${idT}`)
                btnTemp.addEventListener('click', (e) => {
                    //publicar 
                    let input = document.getElementById(`b-mmp-alq-${id}`)
                    comentarioL.info.GetComentario().push(input.value)//comentario                    
                    padre = document.getElementById("d-mp-comentario")//elimina hijos
                    while (padre.firstChild) {
                        padre.firstChild.remove()
                    }
                    while (auxComentario.GetComentario().mostrar(nodo) != null) {//mostrar una uno->nodo
                        nodo = auxComentario.GetComentario().mostrar(nodo)
                        document.getElementById("d-mp-comentario").insertAdjacentHTML('beforeend', `<p class="center-text">${nodo.info}</p>`)
                    }
                })*/
            }
            
        }
    } else {//contram,user,admin esta mal
        //no ingreso
    }
})


//FUNCIONES BOTONES
    //OUT
btnOutAd.addEventListener('click', (e) => {
    ocultoPageMaster.style.display = 'none';
    ocultoPageLogin.style.display = 'block';
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
    //FILE-CLEINTES
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
let AFActor = document.createElement('input'); AFActor.type = 'file';
btnAFActor.addEventListener('click', (e) => {
    e.preventDefault()
    //AFActor.addEventListener('change',funcFile(new Pelicula(),"pel"),false)
    AFActor.click();
    AFActor.remove();
})
AFActor.addEventListener('change', function () {//cambia (e)=> a funciont()
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