import {Componente,PlacaMadre,cpus,gpus,rams,psus,cases,storages,motherBoardsAMD,motherBoardsIntel} from './clases.js';



export function reconstruirDesdeJson(data) {
  data.forEach(item => {
    let nuevo;

    switch (item.tipo) {
      case "Placa Madre AMD":
        nuevo = new PlacaMadre(
          item.nombre,
          item.caracteristica,
          item.precio,
          item.arrayCompatibilidad,
          item.slotRam
        );
        motherBoardsAMD.push(nuevo);
        break;

      case "Placa Madre Intel":
        nuevo = new PlacaMadre(
          item.nombre,
          item.caracteristica,
          item.precio,
          item.arrayCompatibilidad,
          item.slotRam
        );
        motherBoardsIntel.push(nuevo);
        break;

      case "CPU":
        nuevo = new Componente(
          item.nombre,
          item.caracteristica,
          item.precio,
          item.arrayCompatibilidad
        );
        cpus.push(nuevo);
        break;

      case "GPU":
        nuevo = new Componente(
          item.nombre,
          item.caracteristica,
          item.precio,
          item.arrayCompatibilidad
        );
        gpus.push(nuevo);
        break;

      case "RAM":
        nuevo = new Componente(
          item.nombre,
          item.caracteristica,
          item.precio,
          item.arrayCompatibilidad
        );
        rams.push(nuevo);
        break;

      case "Disco Duro":
        nuevo = new Componente(
          item.nombre,
          item.caracteristica,
          item.precio,
          item.arrayCompatibilidad
        );
        storages.push(nuevo);
        break;

      case "Fuente":
        nuevo = new Componente(
          item.nombre,
          item.caracteristica,
          item.precio,
          item.arrayCompatibilidad
        );
        psus.push(nuevo);
        break;

      case "Gabinete":
        nuevo = new Componente(
          item.nombre,
          item.caracteristica,
          item.precio,
          item.arrayCompatibilidad
        );
        cases.push(nuevo);
        break;

      default:
        console.warn("Tipo desconocido:", item.tipo);
    }
  });
  return {
    cpus,
    gpus,
    rams,
    psus,
    cases,
    storages,
    motherBoardsAMD,
    motherBoardsIntel
  };
}