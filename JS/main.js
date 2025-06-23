//IIFE:

(() => {
  //Definimos los componentes con los cuales podemos armar la PC:

  //Placas madre:

  const motherBoardsAMD = [["ASUS Prime B450M-A II", "B450", 70000, ["Ryzen 5", "Ryzen 7"], 4], ["MSI B550M PRO-VDH WIFI", "B550", 95000, ["Ryzen 5", "Ryzen 7"], 4], ["ASUS TUF Gaming X570-Plus", "X570", 130000, ["Ryzen 5", "Ryzen 7"], 4]
  ];

  const motherBoardsIntel = [["ASRock B660M-HDV", "B660", 80000, ["i5", "i7"], 2], ["Gigabyte B660M DS3H DDR4", "B660", 95000, ["i5", "i7"], 4], ["MSI Z690-A PRO DDR4", "Z690", 140000, ["i5", "i7"], 4]
  ];

  //CPU:

  const cpus = [["AMD Ryzen 5 5600", "AM4", 120000, ["B450", "B550", "X570"]], ["AMD Ryzen 7 5800X", "AM4", 180000, ["B450", "B550", "X570"]], ["Intel Core i5 12400F", "LGA1700", 130000, ["B660", "Z690"]], ["Intel Core i7 12700K", "LGA1700", 200000, ["B660", "Z690"]]];

  //GPU

  const gpus = [["NVIDIA RTX 4060", "PCIe 4.0", 250000, ["PCIe 3.0", "PCIe 4.0"]], ["NVIDIA RTX 4070", "PCIe 4.0", 350000, ["PCIe 3.0", "PCIe 4.0"]], ["AMD RX 6700 XT", "PCIe 4.0", 220000, ["PCIe 3.0", "PCIe 4.0"]], ["AMD RX 7600", "PCIe 4.0", 280000, ["PCIe 3.0", "PCIe 4.0"]]];

  //RAM

  const rams = [["16GB DDR4 3200MHz", "DDR4", 40000, ["B450", "B550", "X570", "B660", "Z690"]], ["32GB DDR4 3600MHz", "DDR4", 75000, ["B450", "B550", "X570", "B660", "Z690"]], ["16GB DDR5 5200MHz", "DDR5", 65000, ["Z690"]], ["32GB DDR5 6000MHz", "DDR5", 110000, ["Z690"]]];

  //Discos duros:

  const storages = [["SSD 480GB SATA", "SATA", 25000, ["SATA"]], ["SSD 1TB M.2 NVMe", "M.2 PCIe", 50000, ["M.2 NVMe"]], ["HDD 2TB", "SATA", 30000, ["SATA"]]];

  //Fuentes:

  const psus = [["550W Certificada Bronze", "550W", 35000, ["hasta RTX 4060"]], ["650W Certificada Gold", "650W", 55000, ["RTX 4070 o superior"]]];

  //Gabinetes:

  const cases = [["Mid Tower con RGB", "ATX/MicroATX", 40000, ["ATX", "MicroATX"]], ["Full Tower con vidrio templado", "ATX", 60000, ["ATX"]]];


  //Funciones:

  //Función implementada para mostrar todos los componentes con los que cuenta el simulador de un tipo específico, mostrando nombre y precio de dicho componente:

  function mostrarComponentesPyN(tipo) {
    //Mostramos cada componente, su nombre y precio:
    for (const componente of tipo) {
      console.log(`Nombre = ${componente[0]}\n precio = ${componente[2]}$ ARS`)
    }
  }

  //Función para iterar los componentes de un tipo específico y mostrar todos los datos de los mismos:

  function mostrarComponentesDetallados(tipo) {
    for (const componente of tipo) {
      console.log(`\nNombre del componente = ${componente[0]}\n característica: ${componente[1]}\n precio: ${componente[2]}\n compatibilidades: ${componente[3]}\n`)
    }
  }


  //Función para armar la PC:

  function armarPC() {
    let pc = [];
    pc.push(elegirPlacaMadre());
    pc.push(elegirProcesador(pc));
    pc.push(elegirRams(pc));
    pc.push(elegirDisco());
    let gpu = confirm("¿Desea elegir una tarjeta gráfica?");
    if (gpu) {
      pc.push(elegirGpu());
    }
    else {
      pc.push(null);
    }
    pc.push(elegirFuente(pc));
    pc.push(elegirGabinete());
    return pc;
  }

  //Funcion de validacion de respuestas y entrega de objetos:

  function verificarRespuesta(objeto, promptObjetos, cantMinima, CantMaxima) {
    let opcionValida = false;
    do {
      seleccion = parseInt(prompt(promptObjetos));
      if (seleccion === null || seleccion === 0) {
        alert("Ingrese una opción válida");
        continue;
      }
      else if (seleccion >= cantMinima && seleccion <= CantMaxima) {
        return (objeto[(seleccion) - 1]);
        opcionValida = true;
      }
      else {
        alert("Opción inválida!");
        continue
      }
    }
    while (!opcionValida);
  }

  //Función para elegir placa madre:
  function elegirPlacaMadre() {
    let placaMadreSeleccionada = 1;
    console.log("Las placas madre disponibles son: ");
    console.log("Placas madre compatibles con AMD: ");
    mostrarComponentesDetallados(motherBoardsAMD)
    console.log("Placas madre compatibles con Intel: ");
    mostrarComponentesDetallados(motherBoardsIntel)
    do {
      const amd = confirm("¿Desea una placa compatible con AMD?")
      if (amd) {
        placaMadreSeleccionada = verificarRespuesta(motherBoardsAMD, "¿Desea la placa número uno, dos o tres?\n1: ASUS Prime B450M-A II\n2: MSI B550M PRO-VDH WIFI\n3: ASUS TUF Gaming X570-Plus", 1, 3)
      }
      else {
        placaMadreSeleccionada = verificarRespuesta(motherBoardsIntel, "¿Desea la placa número uno, dos o tres?\n1: ASRock B660M-HDV\n2: Gigabyte B660M DS3H DDR4\n3: MSI Z690-A PRO DDR4", 1, 3)
      }
    }
    while (!!!placaMadreSeleccionada)
    return placaMadreSeleccionada
  }

  //Función para elegir Procesador:
  function elegirProcesador(pc) {
    let placaMadre = pc[0];
    let chipset = placaMadre[1];
    console.log("Procesadores compatibles con la placa madre seleccionada: ");
    const compatibles = cpus.filter(cpu => cpu[3].includes(chipset));
    for (const cpu of compatibles) {
      console.log(`\nNombre del componente = ${cpu[0]}\n característica: ${cpu[1]}\n precio: ${cpu[2]}\n compatibilidades: ${cpu[3]}\n`);
    }
    const procesador = verificarRespuesta(compatibles, `Elija el CPU que desea:\n1: ${compatibles[0][0]}\n2: ${compatibles[1][0]}`, 1, 2);
    return procesador
  }

  //Función para elegir las memorias RAM:

  function elegirRams(pc) {
    let placaMadre = pc[0];
    let cantidadRams = 0;
    let arrayRam = [];
    if (placaMadre[0] === "ASRock B660M-HDV") {
      let cantidadRamsValida = false;
      do {
        cantidadRams = parseInt(prompt("¿Desea comprar 1 o 2 memorias?"));
        if (cantidadRams === 1 || cantidadRams === 2) {
          mostrarComponentesDetallados(rams);
          for (let i = 1; i <= cantidadRams; i++) {
            const ramSel = verificarRespuesta(rams, `Seleccione la memoria RAM:\n1: ${rams[0][0]}\n2: ${rams[1][0]}\n3: ${rams[2][0]}\n4: ${rams[3][0]}`, 1, 4)
            arrayRam.push(ramSel);
          }
          cantidadRamsValida = true;
        }
        else {
          console.log(cantidadRams)
          alert("Ingrese una opción válida!");
          continue
        }
      }
      while (!cantidadRamsValida);
      return arrayRam;
    }
    else {
      let cantidadRamsValida = false;
      do {
        cantidadRams = parseInt(prompt("¿Desea comprar 1 , 2 ó 4 memorias?"));
        if (cantidadRams === 1 || cantidadRams === 2 || cantidadRams === 4) {
          mostrarComponentesDetallados(rams);
          for (let i = 1; i <= cantidadRams; i++) {
            const ramSel = verificarRespuesta(rams, `Seleccione la memoria RAM:\n1: ${rams[0][0]}\n2: ${rams[1][0]}\n3: ${rams[2][0]}\n4: ${rams[3][0]}`, 1, 4);
            arrayRam.push(ramSel)
          }
          cantidadRamsValida = true;
          return arrayRam;
        }
        else {
          alert("Ingrese una opción válida!")
        }
      }
      while (!cantidadRamsValida);
    }
  }

  //Función para elegir disco duro:
  function elegirDisco() {
    const disco = verificarRespuesta(storages, `¿Qué disco duro desea?:\n1: ${storages[0][0]}\n2: ${storages[1][0]}\n3: ${storages[2][0]}`, 1, 3);
    return disco
  }

  //Función para elegir GPU:
  function elegirGpu() {
    mostrarComponentesDetallados(gpus);
    alert("Verifique PCIe: si la versión de la placa madre es menor, la gráfica funcionará con rendimiento reducido.");
    const grafica = verificarRespuesta(gpus, `¿Qué tarjeta gráfica desea?:\n1: ${gpus[0][0]}\n2: ${gpus[1][0]}\n3: ${gpus[2][0]}\n4: ${gpus[3][0]}`, 1, 4);
    return grafica
  }

  //Función para elegir la fuente para la PC:
  function elegirFuente(pc) {
    let grafica = pc[4];
    mostrarComponentesDetallados(psus);
    if (grafica && Array.isArray(grafica)) {
      let nombre = grafica[0].toLowerCase();
      const gpusQueRequieren650W = ["rtx 4070", "rx 6700 xt", "rx 7600"];

      if (gpusQueRequieren650W.some(gpuRequerida => nombre.includes(gpuRequerida))) {
        alert("Se recomienda una fuente de al menos 650W para esta GPU.");
      } else {
        alert("Una fuente de 550W es suficiente para esta GPU.");
      }

    } else {
      alert("No seleccionó una GPU dedicada. Cualquier fuente es compatible.");
    }
    const fuente = verificarRespuesta(psus, `¿Qué fuente desea?:\n1: ${psus[0][0]}\n2: ${psus[1][0]}`, 1, 2);
    return fuente
  }

  //Función para elegir el gabinete: 
  function elegirGabinete() {
    mostrarComponentesDetallados(cases);
    let gabinete = verificarRespuesta(cases, `¿Qué gabinete desea para la computadora?:\n1: ${cases[0][0]}\n2: ${cases[1][0]} `, 1, 2);
    return gabinete
  }


  //Función para calcular el presupuesto final de la PC, mostrando sus componentes:
  function presupuesto(pc) {
    let componentes = [];
    let total = [];
    for (const comp of pc) {
      if (comp === null) { continue }
      if (Array.isArray(comp) && Array.isArray(comp[0])) {
        for (const sub of comp) {
          componentes.push(sub[0]);
          total.push(sub[2]);
        }
      }
      else if (Array.isArray(comp)) {
        componentes.push(comp[0]);
        total.push(comp[2]);
      }
      else {
        alert(`Componente no esperado: ${comp}`)
      }
    }
    for (const pres of componentes) {
      console.log("-" + pres);
    }
    calcularTotal(total);
  }

  //Función para calcular el total con el array de los precios de los componentes:
  function calcularTotal(array) {
    let total = 0;
    for (const comp of array) {
      console.log(`Precio del componente: ${comp}$ ARS`)
      total += parseFloat(comp);
    }
    alert("El total de la computadora tiene un 10% agregado por el armado")
    total *= 1.10 //armado de la PC es un 10% del total
    alert(`El total de la computadora es: ${total.toFixed(2)}$ ARS`)
  }

  //Menú de opciones:
  let opcion = "";

  do {
    opcion = prompt("Bienvenido al simulador:\nSeleccione qué desea realizar:\n1: Mostrar todos los componentes disponibles y su precio\n2: Ver computadoras prefabricadas\n3: Armar su propia computadora\nsalir: Salir del programa");

    if (opcion === "1") {
      console.log("Placas madre compatibles con AMD: ")
      mostrarComponentesPyN(motherBoardsAMD);
      console.log("Placas madre compatibles con Intel: ")
      mostrarComponentesPyN(motherBoardsIntel);
      console.log("Procesadores: ");
      mostrarComponentesPyN(cpus);
      console.log("Tarjetas gráficas: ");
      mostrarComponentesPyN(gpus);
      console.log("Memorias RAM: ");
      mostrarComponentesPyN(rams);
      console.log("Discos duros: ");
      mostrarComponentesPyN(storages);
      console.log("Fuentes de alimentación: ");
      mostrarComponentesPyN(psus);
      console.log("Gabinetes: ");
      mostrarComponentesPyN(cases);
    }
    else if (opcion === "2") {
      //Mostramos 2 opciones de PC ya armadas: y dejamos al usuario elegir
      let pre = ""
      do {
        pre = parseInt(prompt("Tenemos dos opciones de PC ya armadas\nElija la que desee:\n1: AMD básica\n2: INTEL básica"))
        if (pre === 1) {
          const amdBasica = [motherBoardsAMD[0], cpus[0], [rams[0], rams[0]], storages[0], gpus[0], psus[0], cases[0]];
          presupuesto(amdBasica);
        }
        else if (pre === 2) {
          const intBasica = [motherBoardsIntel[0], cpus[2], [rams[0], rams[0]], storages[0], gpus[0], psus[0], cases[0]];
          presupuesto(intBasica);
        }
        else {
          alert("Opción incorrecta!")
        }
      }
      while (!!!pre)
    }
    else if (opcion === "3") {
      const pc = armarPC();
      presupuesto(pc);
    }
  } while (opcion.toLowerCase() !== "salir");

})();