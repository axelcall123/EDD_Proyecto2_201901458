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