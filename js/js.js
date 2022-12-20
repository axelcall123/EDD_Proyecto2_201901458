import { Usuario } from "./clases/usuario";
import { hash } from "./func/func";

var usuario=new Usuario(
    2354168452525,
    "Oscar Armin",
    "EDD",
    hash(12345678),
    12345678,
    true
)
//MENU
btnLogin.addEventListener('click', (e) => {
    e.preventDefault()
    if (addAdmin == true) {//crear default user
        lsUsuario.insertarP(usuario);
        addAdmin = false
    }
    let log = lsUsuario.buscar(iUserL.value, hash(iPassL.value), iCheckL.checked)
    logUser = log["nodo"]
    if (log["TF"]) {//COINCIDENCIA
        if (iCheckL.checked && log["AD"]) {//si es admin pagina master
            //ocultar,mostrar
            ocultoPageLogin.style.display = "none";
            ocultoPageMaster.style.display = "block";
        } else {//no admin main page
            ocultoPageLogin.style.display = "none";
            ocultoNav.style.display = 'block';
            ocultoPageMain.style.display = 'block';

        }
    } else {//contram,user,admin esta mal
        //agregar html
        document.getElementById('span_menu').insertAdjacentHTML('beforeend', '<p id="ispan_menu"> la contraseña o usuario esta mal, o talvez no es administrador <p>')
        //console.log("inicio")
        //funcAsync(3000);//3s
        document.getElementById('ispan_menu').remove()
        //console.log("final")
    }
})