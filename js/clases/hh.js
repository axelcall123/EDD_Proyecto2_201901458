export class HH {
    constructor(hash,prev,root,transact,date){
        this.hash=hash
        this.prev=prev
        this.root=root
        this.transact =transact
        this.date=date
    }
    GetDatos(){
        return{
        hash : this.hash,
        prev : this.prev,
        root : this.root,
        transact : this.transact,
        date : this.date
        }
    }
}