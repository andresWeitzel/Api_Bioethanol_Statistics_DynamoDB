'use strict';

class BioetanolPrecio {
    constructor(
        uuid,
        periodo,
        bioetCanAzucar,
        bioetMaiz,
        createdAt,
        updatedAt
    ) {
        this.uuid = uuid,
            this.periodo = periodo,
            this.bioetCanAzucar = bioetCanAzucar,
            this.bioetMaiz = bioetMaiz,
            this.createdAt = createdAt,
            this.updatedAt = updatedAt
    }
    getUuid(){
        return this.uuid;
    }
    setUuid(uuid){
        return this.uuid;
    }
    getPeriodo(){
        return this.periodo;
    }
    setPeriodo(periodo){
        return this.periodo;
    }
    getBioetCanAzucar(){
        return this.bioetCanAzucar;
    }
    setBioetCanAzucar(bioetCanAzucar){
        return this.bioetCanAzucar;
    }
    getBioetMaiz(){
        return this.bioetMaiz;
    }
    setBioetMaiz(bioetMaiz){
        return this.bioetMaiz;
    }
    getCreatedAt(){
        return this.createdAt;
    }
    setCreatedAt(createdAt){
        return this.createdAt;
    }
    getUpdatedAt(){
        return this.updatedAt;
    }
    setUpdatedAt(updatedAt){
        return this.updatedAt;
    }

    toString(){
        return `[ Uuid : ${this.getUuid()} , Periodo : ${this.getPeriodo()}, Bioetanol Caña de Azucar[$/L] : $${this.getBioetCanAzucar()}, Bioetanol Maíz [$/L] : $${this.getBioetMaiz()}, Created at : ${this.getCreatedAt()}, Updated at : ${this.geUpdatedAt()} ] `;
    }
 



}

module.exports = {
    BioetanolPrecio
}