'use strict';

class BioetanolTotal {
  constructor(
    uuid,
    periodo,
    produccion,
    ventasTotales,
    capacidadInstalada,
    eficienciaProduccion,
    ubicacion,
    estadoOperativo,
    observaciones,
    createdAt,
    updatedAt
  ) {
    this.uuid = uuid;
    this.periodo = periodo;
    this.produccion = produccion;
    this.ventasTotales = ventasTotales;
    this.capacidadInstalada = capacidadInstalada;
    this.eficienciaProduccion = eficienciaProduccion;
    this.ubicacion = ubicacion;
    this.estadoOperativo = estadoOperativo;
    this.observaciones = observaciones;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  getUuid() {
    return this.uuid;
  }
  setUuid(uuid) {
    this.uuid = uuid;
  }
  getPeriodo() {
    return this.periodo;
  }
  setPeriodo(periodo) {
    this.periodo = periodo;
  }
  getProduccion() {
    return this.produccion;
  }
  setProduccion(produccion) {
    this.produccion = produccion;
  }
  getVentasTotales() {
    return this.ventasTotales;
  }
  setVentasTotales(ventasTotales) {
    this.ventasTotales = ventasTotales;
  }
  getCapacidadInstalada() {
    return this.capacidadInstalada;
  }
  setCapacidadInstalada(capacidadInstalada) {
    this.capacidadInstalada = capacidadInstalada;
  }
  getEficienciaProduccion() {
    return this.eficienciaProduccion;
  }
  setEficienciaProduccion(eficienciaProduccion) {
    this.eficienciaProduccion = eficienciaProduccion;
  }
  getUbicacion() {
    return this.ubicacion;
  }
  setUbicacion(ubicacion) {
    this.ubicacion = ubicacion;
  }
  getEstadoOperativo() {
    return this.estadoOperativo;
  }
  setEstadoOperativo(estadoOperativo) {
    this.estadoOperativo = estadoOperativo;
  }
  getObservaciones() {
    return this.observaciones;
  }
  setObservaciones(observaciones) {
    this.observaciones = observaciones;
  }
  getCreatedAt() {
    return this.createdAt;
  }
  setCreatedAt(createdAt) {
    this.createdAt = createdAt;
  }
  getUpdatedAt() {
    return this.updatedAt;
  }
  setUpdatedAt(updatedAt) {
    this.updatedAt = updatedAt;
  }

  toString() {
    return `[ Uuid : ${this.getUuid()}, Periodo : ${this.getPeriodo()}, Producción Total [m3] : ${this.getProduccion()}, Ventas Totales [m3] : ${this.getVentasTotales()}, Capacidad Instalada [m3] : ${this.getCapacidadInstalada()}, Eficiencia Producción [%] : ${this.getEficienciaProduccion()}, Ubicación : ${this.getUbicacion()}, Estado Operativo : ${this.getEstadoOperativo()}, Observaciones : ${this.getObservaciones()}, Created at : ${this.getCreatedAt()}, Updated at : ${this.getUpdatedAt()} ]`;
  }
}

module.exports = {
  BioetanolTotal,
};
