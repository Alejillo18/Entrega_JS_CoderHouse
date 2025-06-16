//IIFE:

(()=>{
//Definimos los componenetes con los cuales podemos armar la pc:

//Placas madres:

let motherBoardsAMD = [["ASUS Prime B450M-A II", "B450", 70000, ["Ryzen 5", "Ryzen 7"], 4], ["MSI B550M PRO-VDH WIFI", "B550", 95000, ["Ryzen 5", "Ryzen 7"], 4], ["ASUS TUF Gaming X570-Plus", "X570", 130000, ["Ryzen 5", "Ryzen 7"], 4]
];

let motherBoardsIntel = [["ASRock B660M-HDV", "B660", 80000, ["i5", "i7"], 2], ["Gigabyte B660M DS3H DDR4", "B660", 95000, ["i5", "i7"], 4], ["MSI Z690-A PRO DDR4", "Z690", 140000, ["i5", "i7"], 4]
];

//CPU:

let cpus = [["AMD Ryzen 5 5600", "AM4", 120000, ["B450", "B550", "X570"]], ["AMD Ryzen 7 5800X", "AM4", 180000, ["B450", "B550", "X570"]], ["Intel Core i5 12400F", "LGA1700", 130000, ["B660", "Z690"]], ["Intel Core i7 12700K", "LGA1700", 200000, ["B660", "Z690"]]];

//GPU

let gpus = [["NVIDIA RTX 4060", "PCIe 4.0", 250000, ["PCIe 3.0", "PCIe 4.0"]], ["NVIDIA RTX 4070", "PCIe 4.0", 350000, ["PCIe 3.0", "PCIe 4.0"]], ["AMD RX 6700 XT", "PCIe 4.0", 220000, ["PCIe 3.0", "PCIe 4.0"]], ["AMD RX 7600", "PCIe 4.0", 280000, ["PCIe 3.0", "PCIe 4.0"]]];

//RAM

let rams = [["16GB DDR4 3200MHz", "DDR4", 40000, ["B450", "B550", "X570", "B660", "Z690"]], ["32GB DDR4 3600MHz", "DDR4", 75000, ["B450", "B550", "X570", "B660", "Z690"]], ["16GB DDR5 5200MHz", "DDR5", 65000, ["Z690"]], ["32GB DDR5 6000MHz", "DDR5", 110000, ["Z690"]]];

//Discos duros:

let storages = [["SSD 480GB SATA", "SATA", 25000, ["SATA"]], ["SSD 1TB M.2 NVMe", "M.2 PCIe", 50000, ["M.2 NVMe"]], ["HDD 2TB", "SATA", 30000, ["SATA"]]];

//Fuentes:

let psus = [["550W Certificada Bronze", "550W", 35000, ["hasta RTX 4060"]], ["650W Certificada Gold", "650W", 55000, ["RTX 4070 o superior"]]];

//Gabinetes:

let cases = [["Mid Tower con RGB", "ATX/MicroATX", 40000, ["ATX", "MicroATX"]],["Full Tower con vidrio templado", "ATX", 60000, ["ATX"]]];


//Funciones:

//Funcion implementada para mostrar todos los componentes con los que cuenta el simulador de un tipo en especifico. mostrando nombre y precio de dicho componente:


function mostrarComponenetesPyN (tipo){
    //Mostramos cada componente, su nombre y precio:
    for (const componente of tipo){
        console.log(`Nombre = ${componente[0]}\n precio = ${componente[2]}$ ARS`)
    }
}

//Funcion para iterar los componentes de un tipo espeficico y mostrar todos los datos de los mismos:

function mostrarComponenteDetallados(tipo){
for(const componente of tipo){
  console.log(`\nNombre del componente = ${componente[0]}\n caracteristica: ${componente[1]}\n precio : ${componente[2]}\n compatibilidades ${componente[3]}\n`)
}
}


//Funcion para armar la pc:

function armarPC(){
  let pc = [];
  pc.push(elegirPlacaMadre());
  pc.push(elegirProcesador(pc));
  pc.push(elegirRams(pc));
  pc.push(elegirDisco());
  let gpu = confirm("Desea elegir una Tarjeta grafica?");
  if (gpu){
    pc.push(elegirGpu());
  }
  else{
    pc.push(null);
  }
  pc.push(elegirFuente(pc));
  pc.push(elegirGabinete());
  console.log(typeof(pc));
}

//Funcion para elegir placa madre:
function elegirPlacaMadre(){
  let placaMadreSeleccionada ;
    console.log("Las placas madres displonibles son: ");
    console.log("Las placas madres compatibles con AMD ");
    mostrarComponenteDetallados(motherBoardsAMD)
    console.log("Las placas madres compatibles con Intel ");
    mostrarComponenteDetallados(motherBoardsIntel)
    do{
      const amd = confirm("Desea una placa compatible con AMD?")
      if (amd){
        placaMadreSeleccionada = prompt("Desea la placa número uno, la dos o las tres?\n1:ASUS Prime B450M-A II\n2:MSI B550M PRO-VDH WIFI\n3:ASUS TUF Gaming X570-Plus")
        return (motherBoardsAMD[parseInt(placaMadreSeleccionada)-1])
      }
      else{
        placaMadreSeleccionada = prompt("Desea la placa Intel número uno, la dos o las tres?\n1:ASRock B660M-HDV\n2:Gigabyte B660M DS3H DDR4\n3:MSI Z690-A PRO DDR4")
        return (motherBoardsIntel[parseInt(placaMadreSeleccionada)-1])
      }
    }
    while(!!!placaMadreSeleccionada)
}



//Funcion para elegir Procesador:
function elegirProcesador(pc){
  let placaMadre= pc[0]
  let chipset = placaMadre[1]
  console.log("Procesadores compatibles con la placa madre seleccionada: ")
  const compatibles = cpus.filter(cpu => cpu[3].includes(chipset));
  for (const cpu of compatibles){
    console.log(`\nNombre del componente = ${cpu[0]}\n caracteristica: ${cpu[1]}\n precio : ${cpu[2]}\n compatibilidades ${cpu[3]}\n`)
  }
  let cpuElegido =parseInt(prompt("Desea elegir el cpu uno , o el cpu 2? :"))
  return compatibles[cpuElegido -1 ]
}



//Funcion para elegir las memorias ram:

function elegirRams (pc) {
  let placaMadre = pc[0];
  let cantidadRams;
  let arrayRam = [];
  if (placaMadre[1] === "ASRock B660M-HDV"){
    cantidadRams = prompt ("Desea comprar 1 ram o 2 memorias?"); 
  }
  else{
   cantidadRams = prompt ("Desea comprar 1 ram , 2 o 4?"); 
  }
  console.log("Por mejor funcionamiento, se recomienda comprar (en caso de que no sea 1) las memorias iguales, ya sean 2 ó 4");
    mostrarComponenteDetallados(rams);
  for (let i = 1; i <= cantidadRams; i++){
   let ram = parseInt(prompt("Desea la ram numero 1,2,3 o 4?"));
   arrayRam.push(rams[ram - 1]);
  }
  return arrayRam;
}


//Funcion para elegir disco duro:
function elegirDisco(){
  mostrarComponenteDetallados(storages);
  let disco = parseInt(prompt("Que disco duro desea? 1, 2 ó 3?"))
  return storages[disco - 1];
}

//Funcion para elegir gpu:

function elegirGpu(){
  mostrarComponenteDetallados(gpus);
  console.log("Verificar pcie, ya que si es menor el de la placa madre, la grafica va a funcionar pero a menor rendimiento!")
  let gpu = parseInt(prompt("Que tarjeta gráfica desea? la numero 1, 2 , 3 o 4?"))
  return gpus[gpu - 1]
}


//Funcion para elegir la fuente para la pc:

function elegirFuente(pc){
  let grafica = pc[4];
  mostrarComponenteDetallados(psus);

  if (grafica && Array.isArray(grafica)) {
    let nombre = grafica[0].toLowerCase();
    const gpusQueRequieren650W = ["rtx 4070", "rx 6700 xt", "rx 7600"];

    if (gpusQueRequieren650W.some(gpuRequerida => nombre.includes(gpuRequerida))) {
      alert("Se recomienda una fuente de al menos 650W para esta GPU.");
    } else {
      alert("Una fuente de 550W es suficiente para esta GPU.");
    }

  } else {
    alert("No seleccionaste una GPU dedicada. Cualquier fuente sirve.");
  }

  let fuente = parseInt(prompt("¿Qué fuente desea? (1 o 2)"));
  return psus[fuente - 1];
}

//Funcion para elegir el gabinete: 
function elegirGabinete(){
  mostrarComponenteDetallados(cases);
  let gabinete = parseInt(prompt("que gabinete desea para la pc? el gabinete 1 o el gabinete 2?"));
return cases[gabinete - 1];
}


//Funcion para calcular el presupuesto final de la pc, mostrando sus componentes:
function presupuesto (pc){
let componentes = [];
for (const comp of pc){
  componentes.push(comp[0]);
}
  let confirmacion = confirm(`Su pc contiene los siguientes componentes: ${componentes[0]}\n${componentes[1]}\n${componentes[2]}\n)${componentes[3]}\n${componentes[4]}\n}${componentes[5]}\n`);
}


//Menú de opciones:

let opcion = "";

do {
  opcion =  prompt("bienvenido al simulador:\nTipee para elegir que desea realizar:\n1: Para mostrar todos los componetes disponibles y su precio.\n2: Para ver las computadoras prefabricadas.\n3: Para armar su propia computadora\nsalir: Sale del programa.");

  if (opcion === "1"){

    console.log("Mother Boards Compatibles con AMD: ")
    mostrarComponenetesPyN(motherBoardsAMD);
    console.log("Mother Boards Compatibles con Intel: ")
    mostrarComponenetesPyN(motherBoardsIntel);
    console.log("Procesadores: ");
    mostrarComponenetesPyN(cpus);
    console.log("Tarjetas gráficas: ");
    mostrarComponenetesPyN(gpus);
    console.log("Memorias RAM: ");
    mostrarComponenetesPyN(rams);
    console.log("Discos Duros: ");
    mostrarComponenetesPyN(storages);
    console.log("Fuentes de alimentacion: ");
    mostrarComponenetesPyN(psus);
    console.log("gabinetes: ");
    mostrarComponenetesPyN(cases);
  }
  else if (opcion === "2"){

  }

  else if (opcion === "3"){

    const pc = armarPC();
    presupuesto(pc);
    
  }
  

} while(opcion === "salir");


})();