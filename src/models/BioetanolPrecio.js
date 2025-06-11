'use strict';

class BioetanolPrecio {
  constructor(uuid, periodo, bioetCanAzucar, bioetMaiz, unidadMedida, fuenteDatos, region, variacionAnual, variacionMensual, observaciones, createdAt, updatedAt) {
    (this.uuid = uuid),
      (this.periodo = periodo),
      (this.bioetCanAzucar = bioetCanAzucar),
      (this.bioetMaiz = bioetMaiz),
      (this.unidadMedida = unidadMedida),
      (this.fuenteDatos = fuenteDatos),
      (this.region = region),
      (this.variacionAnual = variacionAnual),
      (this.variacionMensual = variacionMensual),
      (this.observaciones = observaciones),
      (this.createdAt = createdAt),
      (this.updatedAt = updatedAt);
  }
  getUuid() {
    return this.uuid;
  }
  setUuid(uuid) {
    return this.uuid;
  }
  getPeriodo() {
    return this.periodo;
  }
  setPeriodo(periodo) {
    return this.periodo;
  }
  getBioetCanAzucar() {
    return this.bioetCanAzucar;
  }
  setBioetCanAzucar(bioetCanAzucar) {
    return this.bioetCanAzucar;
  }
  getBioetMaiz() {
    return this.bioetMaiz;
  }
  setBioetMaiz(bioetMaiz) {
    return this.bioetMaiz;
  }
  getUnidadMedida() {
    return this.unidadMedida;
  }
  setUnidadMedida(unidadMedida) {
    return this.unidadMedida;
  }
  getFuenteDatos() {
    return this.fuenteDatos;
  }
  setFuenteDatos(fuenteDatos) {
    return this.fuenteDatos;
  }
  getRegion() {
    return this.region;
  }
  setRegion(region) {
    return this.region;
  }
  getVariacionAnual() {
    return this.variacionAnual;
  }
  setVariacionAnual(variacionAnual) {
    return this.variacionAnual;
  }
  getVariacionMensual() {
    return this.variacionMensual;
  }
  setVariacionMensual(variacionMensual) {
    return this.variacionMensual;
  }
  getObservaciones() {
    return this.observaciones;
  }
  setObservaciones(observaciones) {
    return this.observaciones;
  }
  getCreatedAt() {
    return this.createdAt;
  }
  setCreatedAt(createdAt) {
    return this.createdAt;
  }
  getUpdatedAt() {
    return this.updatedAt;
  }
  setUpdatedAt(updatedAt) {
    return this.updatedAt;
  }

  toString() {
    return `[ Uuid : ${this.getUuid()} , Periodo : ${this.getPeriodo()}, Bioetanol Caña de Azucar[${this.getUnidadMedida()}] : $${this.getBioetCanAzucar()}, Bioetanol Maíz [${this.getUnidadMedida()}] : $${this.getBioetMaiz()}, Región: ${this.getRegion()}, Variación Anual: ${this.getVariacionAnual()}%, Variación Mensual: ${this.getVariacionMensual()}%, Fuente: ${this.getFuenteDatos()}, Observaciones: ${this.getObservaciones()}, Created at : ${this.getCreatedAt()}, Updated at : ${this.getUpdatedAt()} ] `;
  }
}

module.exports = {
  BioetanolPrecio,
};
