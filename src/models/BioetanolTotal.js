'use strict';

class BioetanolTotal {
    constructor(
        uuid,
        periodo,
        produccion,
        ventasTotales,
        createdAt,
        updatedAt
    ) {
        this.uuid = uuid,
            this.periodo = periodo,
            this.produccion = produccion,
            this.ventasTotales = ventasTotales,
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
    getProduccion(){
        return this.produccion;
    }
    setProduccion(produccion){
        return this.produccion;
    }
    getVentasTotales(){
        return this.ventasTotales;
    }
    setVentasTotales(ventasTotales){
        return this.ventasTotales;
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
        return `[ Uuid : ${this.getUuid()} , Periodo : ${this.getPeriodo()}, Producción de Bioetanol Total [m3] : $${this.getproduccion()}, Ventas Totales [m3] : $${this.getventasTotales()}, Created at : ${this.getCreatedAt()}, Updated at : ${this.geUpdatedAt()} ] `;
    }
 



}

module.exports = {
    BioetanolTotal
}