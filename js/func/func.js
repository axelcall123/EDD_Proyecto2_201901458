import { HH } from "../clases/hh.js"//TODO:block

export function hash(string) {
    let digest = "password"
    let algo = CryptoJS.algo.SHA256.create()
    algo.update(digest, "utf-8")
    algo.update(CryptoJS.SHA256(string), "utf-8")
    let hash = algo.finalize().toString(CryptoJS.enc.hex)
    //console.log(hash)
    return hash
}
export function ordenAlfa(str1, str2) {
    str1 = str1.toLowerCase()
    str2 = str2.toLowerCase()
    let arr1 = str1.split("")
    let arr2 = str2.split("")
    var tamMe = 0
    //mayor tam
    if (arr1.length < arr2.length) {
        tamMe = arr1.length
    } else {
        tamMe = arr2.length
    }
    for (var i = 0; i < tamMe; i++) {
        let rest = arr1[i].charCodeAt(0) - arr2[i].charCodeAt(0)//si a[141]-b[142]=-1 || b[142]-a[141]=1
        if (rest < 0) {//es mayor str1
            return { may: str1, men: str2, stru: 1, strd: 0 }
        } else if (rest > 0) {//es mayor str2
            return { may: str2, men: str1, stru: 0, strd: 1 }
        }
    }
    //si llego al final[]
    if (tamMe == arr1.length) {//mayor arr2
        return { may: str1, men: str2, stru: 1, strd: 0 }
    } else {//mayor arr1
        return { may: str2, men: str1, stru: 0, strd: 1 }
    }
}
export function Estrella(calificacion){
    let cali=""
    let nCali=""
    for(var i=0;i<5;i++){
        if(i<calificacion){
            cali = cali +"★"
        }else{
            nCali = nCali + "★"
        }
    }
    return {es:cali,nes:nCali}
}

export function blockChainH(index,time,previous,root){
    let nonce=0
    let str=""
    
    str = hash(index + time + previous + root + nonce)
    if (str.substr(0, 2)=="00"){//hash si es
        return str
    }else{
        while (str.substr(0, 2) != "00"){//hash sea bueno si no F
            nonce++
            str = hash(index + time + previous + root + nonce)
        }
        return { str: str ,nonce:nonce}
    }
}