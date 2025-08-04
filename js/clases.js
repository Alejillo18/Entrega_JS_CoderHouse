  //Clases
  //Clase componente, que cuenta con las caracteristicas que deben tener todos los componentes en nuestro simulador:
  export class Componente {
    constructor(nombre, caracteristica, precio, arrayCompatibilidad) {
      this.nombre = nombre;
      this.caracteristica = caracteristica;
      this.precio = precio;
      this.arrayCompatibilidad = arrayCompatibilidad;
      this.tipo = "Componente";
    }
  }
  //La clase placaMadre extiende de Componentes y agregamos el slot de las memorias ram
 export class PlacaMadre extends Componente {
    constructor(nombre, caracteristica, precio, arrayCompatibilidad, slotRam) {
      super(nombre, caracteristica, precio, arrayCompatibilidad);
      this.slotRam = slotRam;
      this.tipo = "Placa Madre";
    }
  }

// Arrays globales
export const cpus = [];
export const gpus = [];
export const rams = [];
export const psus = [];
export const cases = [];
export const storages = [];
export const motherBoardsAMD = [];
export const motherBoardsIntel = [];
