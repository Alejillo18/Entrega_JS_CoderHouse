//IIFE:

(() => {
  //Clases
  //Clase componente, que cuenta con las caracteristicas que deben tener todos los componentes en nuestro simulador:
  class Componente {
    constructor(nombre, caracteristica, precio, arrayCompatibilidad) {
      this.nombre = nombre;
      this.caracteristica = caracteristica;
      this.precio = precio;
      this.arrayCompatibilidad = arrayCompatibilidad;
      this.tipo = "Componente";
    }
    mostrarComponentes() {
      console.log(
        `nombre: ${this.nombre}, caracteristicas: ${this.caracteristica}, precio: ${this.precio}, Compatible: ${this.arrayCompatibilidad}`
      );
    }
  }
  //La clase placaMadre extiende de Componentes y agregamos el slot de las memorias ram
  class PlacaMadre extends Componente {
    constructor(nombre, caracteristica, precio, arrayCompatibilidad, slotRam) {
      super(nombre, caracteristica, precio, arrayCompatibilidad);
      this.slotRam = slotRam;
      this.tipo = "Placa Madre";
    }
    mostrarComponentes() {
      console.log(
        `nombre: ${this.nombre}, caracteristicas: ${this.caracteristica}, precio: ${this.precio}, Compatible: ${arrayCompatibilidad}, slot de memorias ram: ${slotRam}`
      );
    }
  }

  //Clase para el armado de la PC del usuario
  class Pc {
    constructor(componentes = []) {
      this.componentes = componentes;
      this.tipo = "Pc";
    }
    calcularSubTotal(componentes) {
      let subtotal = 0;
      for (const comp of componentes) {
        subtotal += parseFloat(comp.precio);
      }
      return subtotal.toFixed(2);
    }
    calcularTotal(subtotal) {
      return (subtotal * 1.05).toFixed(2);
    }
  }

  //Convertimos nuestro array de datos anterior en nuestro objeto componentes o placaMadre
  function crearAComponente(array) {
    return array.map(
      ([nombre, caracteristica, precio, arrayCompatibilidad]) =>
        new Componente(nombre, caracteristica, precio, arrayCompatibilidad)
    );
  }

  function crearAComponenteMB(array) {
    return array.map(
      ([nombre, caracteristica, precio, arrayCompatibilidad, slotRam]) =>
        new PlacaMadre(
          nombre,
          caracteristica,
          precio,
          arrayCompatibilidad,
          slotRam
        )
    );
  }

  //Convertimos el array de datos, en array de objetos

  //Placas madre:
  const motherBoardsAMD = crearAComponenteMB([
    ["ASUS Prime B450M-A II", "B450", 70000, ["Ryzen 5", "Ryzen 7"], 4],
    ["MSI B550M PRO-VDH WIFI", "B550", 95000, ["Ryzen 5", "Ryzen 7"], 4],
    ["ASUS TUF Gaming X570-Plus", "X570", 130000, ["Ryzen 5", "Ryzen 7"], 4],
  ]);

  const motherBoardsIntel = crearAComponenteMB([
    ["ASRock B660M-HDV", "B660", 80000, ["i5", "i7"], 2],
    ["Gigabyte B660M DS3H DDR4", "B660", 95000, ["i5", "i7"], 4],
    ["MSI Z690-A PRO DDR4", "Z690", 140000, ["i5", "i7"], 4],
  ]);

  //CPU:
  const cpus = crearAComponente([
    ["AMD Ryzen 5 5600", "AM4", 120000, ["B450", "B550", "X570"]],
    ["AMD Ryzen 7 5800X", "AM4", 180000, ["B450", "B550", "X570"]],
    ["Intel Core i5 12400F", "LGA1700", 130000, ["B660", "Z690"]],
    ["Intel Core i7 12700K", "LGA1700", 200000, ["B660", "Z690"]],
  ]);

  //GPU
  const gpus = crearAComponente([
    ["NVIDIA RTX 4060", "PCIe 4.0", 250000, ["PCIe 3.0", "PCIe 4.0"]],
    ["NVIDIA RTX 4070", "PCIe 4.0", 350000, ["PCIe 3.0", "PCIe 4.0"]],
    ["AMD RX 6700 XT", "PCIe 4.0", 220000, ["PCIe 3.0", "PCIe 4.0"]],
    ["AMD RX 7600", "PCIe 4.0", 280000, ["PCIe 3.0", "PCIe 4.0"]],
  ]);

  //RAM
  const rams = crearAComponente([
    [
      "16GB DDR4 3200MHz",
      "DDR4",
      40000,
      ["B450", "B550", "X570", "B660", "Z690"],
    ],
    [
      "32GB DDR4 3600MHz",
      "DDR4",
      75000,
      ["B450", "B550", "X570", "B660", "Z690"],
    ],
    ["16GB DDR5 5200MHz", "DDR5", 65000, ["Z690"]],
    ["32GB DDR5 6000MHz", "DDR5", 110000, ["Z690"]],
  ]);

  //Discos duros:
  const storages = crearAComponente([
    ["SSD 480GB SATA", "SATA", 25000, ["SATA"]],
    ["SSD 1TB M.2 NVMe", "M.2 PCIe", 50000, ["M.2 NVMe"]],
    ["HDD 2TB", "SATA", 30000, ["SATA"]],
  ]);

  //Fuentes:
  const psus = crearAComponente([
    ["550W Certificada Bronze", "550W", 35000, ["hasta RTX 4060"]],
    ["650W Certificada Gold", "650W", 55000, ["RTX 4070 o superior"]],
  ]);

  //Gabinetes:
  const cases = crearAComponente([
    ["Mid Tower con RGB", "ATX/MicroATX", 40000, ["ATX", "MicroATX"]],
    ["Full Tower con vidrio templado", "ATX", 60000, ["ATX"]],
  ]);

  document
    .querySelector('select[name="tipo"]')
    .addEventListener("change", function () {
      document.getElementById("grupo-slots").style.display =
        this.value === "Placa Madre" ? "block" : "none";
    });

  //Funciones para agregar componentes:
  function agregarComponente(
    tipo,
    nombre,
    caracteristica,
    precio,
    arrayCompatibilidad,
    slotRam
  ) {
    let nuevoComponente;
    const componenteBase = {
      tipo,
      nombre,
      caracteristica,
      precio,
      arrayCompatibilidad,
      slotRam,
    };

    switch (tipo) {
      case "Placa Madre AMD":
        nuevoComponente = new PlacaMadre(
          nombre,
          caracteristica,
          precio,
          arrayCompatibilidad,
          slotRam
        );
        motherBoardsAMD.push(nuevoComponente);
        break;
      case "Placa Madre Intel":
        nuevoComponente = new PlacaMadre(
          nombre,
          caracteristica,
          precio,
          arrayCompatibilidad,
          slotRam
        );
        motherBoardsIntel.push(nuevoComponente);
        break;
      case "CPU":
        nuevoComponente = new Componente(
          nombre,
          caracteristica,
          precio,
          arrayCompatibilidad
        );
        cpus.push(nuevoComponente);
        break;
      case "GPU":
        nuevoComponente = new Componente(
          nombre,
          caracteristica,
          precio,
          arrayCompatibilidad
        );
        gpus.push(nuevoComponente);
        break;
      case "RAM":
        nuevoComponente = new Componente(
          nombre,
          caracteristica,
          precio,
          arrayCompatibilidad
        );
        rams.push(nuevoComponente);
        break;
      case "Disco Duro":
        nuevoComponente = new Componente(
          nombre,
          caracteristica,
          precio,
          arrayCompatibilidad
        );
        storages.push(nuevoComponente);
        break;
      case "Fuente":
        nuevoComponente = new Componente(
          nombre,
          caracteristica,
          precio,
          arrayCompatibilidad
        );
        psus.push(nuevoComponente);
        break;
      case "Gabinete":
        nuevoComponente = new Componente(
          nombre,
          caracteristica,
          precio,
          arrayCompatibilidad
        );
        cases.push(nuevoComponente);
        break;
    }

    const guardados =
      JSON.parse(localStorage.getItem("componentesAgregados")) || [];
    guardados.push(componenteBase);
    localStorage.setItem("componentesAgregados", JSON.stringify(guardados));
  }

  function cargarComponentesLocales() {
    const guardados =
      JSON.parse(localStorage.getItem("componentesAgregados")) || [];
    for (const comp of guardados) {
      let nuevo;
      switch (comp.tipo) {
        case "Placa Madre AMD":
          nuevo = new PlacaMadre(
            comp.nombre,
            comp.caracteristica,
            comp.precio,
            comp.arrayCompatibilidad,
            comp.slotRam
          );
          motherBoardsAMD.push(nuevo);
          break;
        case "Placa Madre Intel":
          nuevo = new PlacaMadre(
            comp.nombre,
            comp.caracteristica,
            comp.precio,
            comp.arrayCompatibilidad,
            comp.slotRam
          );
          motherBoardsIntel.push(nuevo);
          break;
        case "CPU":
          nuevo = new Componente(
            comp.nombre,
            comp.caracteristica,
            comp.precio,
            comp.arrayCompatibilidad
          );
          cpus.push(nuevo);
          break;
        case "GPU":
          nuevo = new Componente(
            comp.nombre,
            comp.caracteristica,
            comp.precio,
            comp.arrayCompatibilidad
          );
          gpus.push(nuevo);
          break;
        case "RAM":
          nuevo = new Componente(
            comp.nombre,
            comp.caracteristica,
            comp.precio,
            comp.arrayCompatibilidad
          );
          rams.push(nuevo);
          break;
        case "Disco Duro":
          nuevo = new Componente(
            comp.nombre,
            comp.caracteristica,
            comp.precio,
            comp.arrayCompatibilidad
          );
          storages.push(nuevo);
          break;
        case "Fuente":
          nuevo = new Componente(
            comp.nombre,
            comp.caracteristica,
            comp.precio,
            comp.arrayCompatibilidad
          );
          psus.push(nuevo);
          break;
        case "Gabinete":
          nuevo = new Componente(
            comp.nombre,
            comp.caracteristica,
            comp.precio,
            comp.arrayCompatibilidad
          );
          cases.push(nuevo);
          break;
      }
    }
  }
  const form = document.getElementById("form-nuevo-componente");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const tipoField = form.tipo;
      let tipoValor = tipoField.value;
      if (tipoValor === "Placa Madre") {
        tipoValor = form.marca.value;
      }
      const nombre = form.nombre.value.trim();
      const caracteristica = form.caracteristica.value.trim();
      const precio = parseFloat(form.precio.value);
      const compat = form.compatibilidad.value
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s);
      const slots = tipoValor.includes("Placa Madre")
        ? parseInt(form.slotsRam.value, 10)
        : undefined;
      agregarComponente(
        tipoValor,
        nombre,
        caracteristica,
        precio,
        compat,
        slots
      );
      form.reset();
      location.reload();
    });
  }

  cargarComponentesLocales();

  //Funciones para agregar productos individuales al carrito:

  //1 mostrar todos los componentes: En componentes.html
  let container = document.getElementById("container");
  if (container) {
    //placas madre AMD
    let tablaHTML = ``;
    tablaHTML = `<div class = "titulo"><h2> Placas madre AMD</h2> <img src = "../assets/motherboard.svg"></div>
    <table>
    <tr>
    <th>nombre</th>
    <th>precio</th>
    <th>compatible</th>
    </tr>`;
    motherBoardsAMD.forEach((element) => {
      tablaHTML += `        
     <tr>
    <td>${element.nombre}</td>
    <td>${element.precio} $</td>
    <td>${
      Array.isArray(element.arrayCompatibilidad)
        ? element.arrayCompatibilidad.join(`,`)
        : ""
    }</td>
    </tr>
    `;
    });
    tablaHTML += `</table>`;

    //Placas madres intel
    tablaHTML += `<div class = "titulo"><h2> Placas madre Intel</h2> <img src = "../assets/motherboard.svg"></div>
     <table>
    <tr>
    <th>nombre</th>
    <th>precio</th>
    <th>compatible</th>
    </tr>`;
    motherBoardsIntel.forEach((element) => {
      tablaHTML += `        
  <tr>
    <td>${element.nombre}</td>
    <td>${element.precio} $</td>
    <td>${
      Array.isArray(element.arrayCompatibilidad)
        ? element.arrayCompatibilidad.join(", ")
        : ""
    }</td>
  </tr>`;
    });
    tablaHTML += `</table>`;
    //Procesadores
    tablaHTML += `<div class = "titulo"><h2> Procesadores </h2> <img src = "../assets/cpu.svg"></div>
     <table>
    <tr>
    <th>nombre</th>
    <th>precio</th>
    <th>compatible</th>
    </tr>`;
    cpus.forEach((element) => {
      tablaHTML += `        
  <tr>
    <td>${element.nombre}</td>
    <td>${element.precio} $</td>
    <td>${
      Array.isArray(element.arrayCompatibilidad)
        ? element.arrayCompatibilidad.join(", ")
        : ""
    }</td>
  </tr>`;
    });
    tablaHTML += `</table>`;

    //Memorias Ram
    tablaHTML += `<div class = "titulo"><h2> Memorias Ram </h2> <img src = "../assets/memory.svg"></div>
    <table>
    <tr>
    <th>nombre</th>
    <th>precio</th>
    <th>compatible</th>
    </tr>`;
    rams.forEach((element) => {
      tablaHTML += `        
  <tr>
    <td>${element.nombre}</td>
    <td>${element.precio} $</td>
    <td>${
      Array.isArray(element.arrayCompatibilidad)
        ? element.arrayCompatibilidad.join(", ")
        : ""
    }</td>
  </tr>`;
    });
    tablaHTML += `</table>`;

    //Placas de video
    tablaHTML += `<div class = "titulo"><h2> Placas de video </h2> <img src = "../assets/gpu-card.svg"></div>
    <table>
    <tr>
    <th>nombre</th>
    <th>precio</th>
    <th>compatible</th>
    </tr>`;
    gpus.forEach((element) => {
      tablaHTML += `        
  <tr>
    <td>${element.nombre}</td>
    <td>${element.precio} $</td>
    <td>${
      Array.isArray(element.arrayCompatibilidad)
        ? element.arrayCompatibilidad.join(", ")
        : ""
    }</td>
  </tr>`;
    });
    tablaHTML += `</table>`;

    //Fuentes de alimentacion
    tablaHTML += `<div class = "titulo"><h2> Fuentes de alimentación </h2> <img src = "../assets/power.svg"></div>
    <table>
    <tr>
    <th>nombre</th>
    <th>precio</th>
    <th>compatible</th>
    </tr>`;
    psus.forEach((element) => {
      tablaHTML += `        
  <tr>
    <td>${element.nombre}</td>
    <td>${element.precio} $</td>
    <td>${
      Array.isArray(element.arrayCompatibilidad)
        ? element.arrayCompatibilidad.join(", ")
        : ""
    }</td>
  </tr>
  `;
    });
    tablaHTML += `</table>`;

    //Discos duros
    tablaHTML += `<div class = "titulo"><h2> Discos Duros </h2> <img src = "../assets/nvme.svg"></div>
     <table>
    <tr>
    <th>nombre</th>
    <th>precio</th>
    <th>compatible</th>
    </tr>`;
    storages.forEach((element) => {
      tablaHTML += `        
  <tr>
    <td>${element.nombre}</td>
    <td>${element.precio} $</td>
    <td>${
      Array.isArray(element.arrayCompatibilidad)
        ? element.arrayCompatibilidad.join(", ")
        : ""
    }</td>
  </tr>`;
    });
    tablaHTML += `</table>`;

    //Gabinetes
    tablaHTML += `<div class = "titulo"><h2> Gabinetes </h2> <img src = "../assets/pc.svg"></div>
    <table>
    <tr>
    <th>nombre</th>
    <th>precio</th>
    <th>compatible</th>
    </tr>`;
    cases.forEach((element) => {
      tablaHTML += `        
  <tr>
    <td>${element.nombre}</td>
    <td>${element.precio} $</td>
    <td>${
      Array.isArray(element.arrayCompatibilidad)
        ? element.arrayCompatibilidad.join(", ")
        : ""
    }</td>
  </tr>`;
    });
    tablaHTML += `</table>`;
    container.innerHTML += tablaHTML;
  }

  function getIdComp() {
    let comp = 0;
    for (let i = 0; i < sessionStorage.length; i++) {
      let key = sessionStorage.key(i);
      if (key.startsWith("comp")) {
        let producto = JSON.parse(sessionStorage.getItem(key));
        if (producto.tipo === "Componente" || producto.tipo === "Placa Madre") {
          comp += 1;
        }
      }
    }
    return comp;
  }

  //Mostrar todos los componentes en comprar_Componentes.html, con una caja de texto para ingresar la cantidad que desea y un boton para agregarlos al carrito:
  let containerComprarComponentes = document.getElementById(
    "containerComprarComponentes"
  );
  if (containerComprarComponentes) {
    //placas madre AMD
    let tablaHTML = ``;
    tablaHTML = `<div class = "titulo"><h2> Placas madre AMD</h2> <img src = "/assets/motherboard"></div>
    <table>
    <tr>
    <th>nombre</th>
    <th>precio</th>
    <th>compatible</th>
    <th>cantidad</th>
    <th>Agregar Al carrito</th>
    </tr>`;
    motherBoardsAMD.forEach((element, indice) => {
      tablaHTML += `        
     <tr>
    <td>${element.nombre}</td>
    <td>${element.precio} $</td>
    <td>${
      Array.isArray(element.arrayCompatibilidad)
        ? element.arrayCompatibilidad.join(`,`)
        : ""
    }</td>
   <td>
  <input type="number" class="cantidadInput" min="1" value="1" />
  </td>
  <td>
  <button class="AgregarComp" data-indice="${indice}" data-tipo="MotherAmd">🛒</button>
  </td>
    </tr>
    `;
    });
    tablaHTML += `</table>`;

    //Placas madres intel
    tablaHTML += `<div class = "titulo"><h2> Placas madre Intel</h2> <img src = "../assets/motherboard.svg"></div>
     <table>
    <tr>
    <th>nombre</th>
    <th>precio</th>
    <th>compatible</th>
    <th>cantidad</th>
    <th>Agregar Al carrito</th>
    </tr>`;
    motherBoardsIntel.forEach((element, indice) => {
      tablaHTML += `        
  <tr>
    <td>${element.nombre}</td>
    <td>${element.precio} $</td>
    <td>${
      Array.isArray(element.arrayCompatibilidad)
        ? element.arrayCompatibilidad.join(", ")
        : ""
    }</td>
     <td>
  <input type="number" class="cantidadInput" min="1" value="1" />
  </td>
  <td>
  <button class="AgregarComp" data-indice="${indice}" data-tipo="MotherIntel">🛒</button>
  </td>
  </tr>`;
    });
    tablaHTML += `</table>`;
    //Procesadores
    tablaHTML += `<div class = "titulo"><h2> Procesadores </h2> <img src = "../assets/cpu.svg"></div>
     <table>
    <tr>
    <th>nombre</th>
    <th>precio</th>
    <th>compatible</th>
    <th>cantidad</th>
    <th>Agregar Al carrito</th>
    </tr>`;
    cpus.forEach((element, indice) => {
      tablaHTML += `        
  <tr>
    <td>${element.nombre}</td>
    <td>${element.precio} $</td>
    <td>${
      Array.isArray(element.arrayCompatibilidad)
        ? element.arrayCompatibilidad.join(", ")
        : ""
    }</td>
       <td>
  <input type="number" class="cantidadInput" min="1" value="1" />
  </td>
  <td>
  <button class="AgregarComp" data-indice="${indice}" data-tipo="Procesadores">🛒</button>
  </td>
  </tr>`;
    });
    tablaHTML += `</table>`;

    //Memorias Ram
    tablaHTML += `<div class = "titulo"><h2> Memorias Ram </h2> <img src = "/assets/memory"></div>
    <table>
    <tr>
    <th>nombre</th>
    <th>precio</th>
    <th>compatible</th>
    <th>cantidad</th>
    <th>Agregar Al carrito</th>
    </tr>`;
    rams.forEach((element, indice) => {
      tablaHTML += `        
  <tr>
    <td>${element.nombre}</td>
    <td>${element.precio} $</td>
    <td>${
      Array.isArray(element.arrayCompatibilidad)
        ? element.arrayCompatibilidad.join(", ")
        : ""
    }</td>
        <td>
  <input type="number" class="cantidadInput" min="1" value="1" />
  </td>
  <td>
  <button class="AgregarComp" data-indice="${indice}" data-tipo="Rams">🛒</button>
  </td>
  </tr>`;
    });
    tablaHTML += `</table>`;

    //Placas de video
    tablaHTML += `<div class = "titulo"><h2> Placas de video </h2> <img src = "../assets/gpu-card.svg"></div>
    <table>
    <tr>
    <th>nombre</th>
    <th>precio</th>
    <th>compatible</th>
    <th>cantidad</th>
    <th>Agregar Al carrito</th>
    </tr>`;
    gpus.forEach((element, indice) => {
      tablaHTML += `        
  <tr>
    <td>${element.nombre}</td>
    <td>${element.precio} $</td>
    <td>${
      Array.isArray(element.arrayCompatibilidad)
        ? element.arrayCompatibilidad.join(", ")
        : ""
    }</td>
       <td>
  <input type="number" class="cantidadInput" min="1" value="1" />
  </td>
  <td>
  <button class="AgregarComp" data-indice="${indice}" data-tipo="gpu">🛒</button>
  </td>
  </tr>`;
    });
    tablaHTML += `</table>`;

    //Fuentes de alimentacion
    tablaHTML += `<div class = "titulo"><h2> Fuentes de alimentación </h2> <img src = "../assets/power.svg"></div>
    <table>
    <tr>
    <th>nombre</th>
    <th>precio</th>
    <th>compatible</th>
    <th>cantidad</th>
    <th>Agregar Al carrito</th>
    </tr>`;
    psus.forEach((element, indice) => {
      tablaHTML += `        
  <tr>
    <td>${element.nombre}</td>
    <td>${element.precio} $</td>
    <td>${
      Array.isArray(element.arrayCompatibilidad)
        ? element.arrayCompatibilidad.join(", ")
        : ""
    }</td>
    <td>
  <input type="number" class="cantidadInput" min="1" value="1" />
  </td>
  <td>
  <button class="AgregarComp" data-indice="${indice}" data-tipo="Psus">🛒</button>
  </td>
  </tr>
  `;
    });
    tablaHTML += `</table>`;

    //Discos duros
    tablaHTML += `<div class = "titulo"><h2> Discos Duros </h2> <img src = "../assets/nvme.svg"></div>
     <table>
    <tr>
    <th>nombre</th>
    <th>precio</th>
    <th>compatible</th>
    <th>cantidad</th>
    <th>Agregar Al carrito</th>
    </tr>`;
    storages.forEach((element, indice) => {
      tablaHTML += `        
  <tr>
    <td>${element.nombre}</td>
    <td>${element.precio} $</td>
    <td>${
      Array.isArray(element.arrayCompatibilidad)
        ? element.arrayCompatibilidad.join(", ")
        : ""
    }</td>
     <td>
  <input type="number" class="cantidadInput" min="1" value="1" />
  </td>
  <td>
  <button class="AgregarComp" data-indice="${indice}" data-tipo="Storage">🛒</button>
  </td>
  </tr>`;
    });
    tablaHTML += `</table>`;

    //Gabinetes
    tablaHTML += `<div class = "titulo"><h2> Gabinetes </h2> <img src = "/assets/pc"></div>
    <table>
    <tr>
    <th>nombre</th>
    <th>precio</th>
    <th>compatible</th>
    <th>cantidad</th>
    <th>Agregar Al carrito</th>
    </tr>`;
    cases.forEach((element, indice) => {
      tablaHTML += `        
  <tr>
    <td>${element.nombre}</td>
    <td>${element.precio} $</td>
    <td>${
      Array.isArray(element.arrayCompatibilidad)
        ? element.arrayCompatibilidad.join(", ")
        : ""
    }</td>
      <td>
  <input type="number" class="cantidadInput" min="1" value="1" />
  </td>
  <td>
  <button class="AgregarComp" data-indice="${indice}" data-tipo="Case">🛒</button>
  </td>
  </tr>`;
    });
    tablaHTML += `</table>`;
    containerComprarComponentes.innerHTML += tablaHTML;
  }

  //Listeners a todos los botones:
  document.querySelectorAll(".AgregarComp").forEach((btn) => {
    btn.addEventListener("click", (element) => {
      const indice = parseInt(btn.dataset.indice);
      const tipo = btn.dataset.tipo;
      const row = btn.closest("tr");
      const input = row.querySelector(".cantidadInput");
      const cantidad = parseInt(input.value);
      if (cantidad <= 0 || isNaN(cantidad)) {
        input.style.border = "2px solid red";
        input.style.color = "red";
        return;
      } else {
        input.style.border = "";
        input.style.color = "";
      }
      let productoOriginal;
      switch (tipo) {
        case "Procesadores":
          productoOriginal = cpus[indice];
          break;
        case "MotherIntel":
          productoOriginal = motherBoardsIntel[indice];
          break;
        case "MotherAmd":
          productoOriginal = motherBoardsAMD[indice];
          break;
        case "gpu":
          productoOriginal = gpus[indice];
          break;
        case "Rams":
          productoOriginal = rams[indice];
          break;
        case "Storage":
          productoOriginal = storages[indice];
          break;
        case "Psus":
          productoOriginal = psus[indice];
          break;
        case "Case":
          productoOriginal = cases[indice];
          break;
      }
      if (!productoOriginal) {
        alert("Hubo un error al identificar el producto.");
        return;
      }

      for (let i = 0; i < cantidad; i++) {
        productoJSON = JSON.stringify(productoOriginal);
        const id = getIdComp() + 1;
        sessionStorage.setItem("comp" + id, productoJSON);
      }
      ArmarElcarrito();
    });
  });

  //Funcion para precios con punto
  function preciosPunto(precio) {
    const num = typeof precio === "string" ? parseFloat(precio) : precio;
    if (isNaN(num)) {
      return "0,00";
    }
    return num.toLocaleString("es-AR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  //Funcion para reconvertirlos a float:
  function preciosNormal(precioPunto) {
    return (precioPunto = parseFloat(
      "1.000.000,50".replace(/\./g, "").replace(",", ".")
    ));
  }

  //funcion para reconstruir los objetos:
  function reconstruirObjeto(producto) {
    if (producto.tipo === "Componente") {
      producto = new Componente(
        producto.nombre,
        producto.caracteristica,
        producto.precio,
        producto.arrayCompatibilidad
      );
    } else if (producto.tipo === "Placa Madre") {
      producto = new PlacaMadre(
        producto.nombre,
        producto.caracteristica,
        producto.precio,
        producto.arrayCompatibilidad,
        producto.slotRam
      );
    } else if (producto.tipo === "Pc") {
      producto = new Pc(producto.componentes.map(reconstruirObjeto));
    } else {
      return null;
    }
    return producto;
  }

  //Funcion para genera los ids de las pc, por si el usuario necesita mas de una pc o componente.
  function getIdPc() {
    let pc = 0;
    for (let i = 0; i < sessionStorage.length; i++) {
      let key = sessionStorage.key(i);
      if (key.startsWith("pc")) {
        let producto = JSON.parse(sessionStorage.getItem(key));
        if (producto.tipo === "Pc") {
          pc += 1;
        }
      }
    }
    return pc;
  }

  function BuscarSessionStorage() {
    let componentes = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      let key = sessionStorage.key(i);
      let producto = JSON.parse(sessionStorage.getItem(key));
      let productoR = reconstruirObjeto(producto);
      componentes.push(productoR);
    }
    return componentes;
  }

  //Funcion para almacenarEn un carrito las cosas, mediante la key de session storage
  function ArmarElcarrito() {
    let total = 0;
    const carrito = BuscarSessionStorage();
    const tablaProductosCarrito = document.getElementById("sidebar");
    if (tablaProductosCarrito && carrito.length > 1) {
      let tablaHTML = ``;
      carrito.forEach((producto) => {
        if (!producto) return;
        if (producto.tipo === "Pc") {
          tablaHTML += `<table><tr style = "display: grid; grid-template-columns: 1fr 1fr; margin-top : 10px">
          <th style="color: black">Nombre</th>
          <th style="color: black">Precio</th>
          </tr>`;
          total += parseFloat(
            producto.calcularTotal(
              producto.calcularSubTotal(producto.componentes)
            )
          );
          producto.componentes.forEach((comp) => {
            tablaHTML += `
        <tr style="display: grid; grid-template-columns: 1fr 1fr;">
          <td style="font-size : 10px;">${comp.nombre}</td>
          <td style="font-size : 10px;">${comp.precio}</td>
        </tr>`;
          });
          tablaHTML += `</table>`;
        } else {
          tablaHTML += `<table><tr style = "display: grid; grid-template-columns: 1fr 1fr; margin-top : 10px">
          <th style="color: black">Nombre</th>
          <th style="color: black">Precio</th>
          </tr>`;
          total += parseFloat(producto.precio);
          tablaHTML += `
      <tr style="display: grid; grid-template-columns: 1fr 1fr;">
        <td style="font-size : 10px;">${producto.nombre}</td>
        <td style="font-size : 10px;">${producto.precio}</td>
      </tr>`;
          tablaHTML += `</table>`;
        }
      });
      tablaHTML += `<div style= "display: flex; flex-direction : row; gap : 20px; justify-self: center;">
        <td style="font-size : 10px;color: black">Total</td>
        <td style="font-size : 10px;color: black">${preciosPunto(
          total
        )} $ ARS</td>
        </tr>
        </div>`;
      tablaHTML += `
        <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 15px;">
        <button id="btnVaciarCarrito" style="padding: 5px; background-color: red; color: white; border: none; cursor: pointer;">🗑️ Vaciar carrito</button>
        <button id="btnPagarCarrito" style="padding: 5px; background-color: green; color: white; border: none; cursor: pointer;">💳 Proceder al pago</button>
        </div>`;
      tablaProductosCarrito.innerHTML = tablaHTML;
      const carritoVaciar = document.getElementById("btnVaciarCarrito");
      if (carritoVaciar) {
        carritoVaciar.addEventListener("click", () => {
          const keys = [];
          for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            if (key && (key.startsWith("comp") || key.startsWith("pc"))) {
              keys.push(key);
            }
          }
          keys.forEach((key) => sessionStorage.removeItem(key));
          ArmarElcarrito();
        });
      }
      document
        .getElementById("btnPagarCarrito")
        .addEventListener("click", () => {
          const menuToggle = document.getElementById("menu-toggle");
          if (menuToggle) menuToggle.checked = false;
          const card = document.createElement("div");
          card.classList.add("card-gracias");
          card.innerHTML = `
        <p>Gracias por su compra!</p>
        <button style =" margin-top 10px; padding: 5px; background-color: black; color: blue ">Cerrar</button>`;
          document.body.appendChild(card);
          card.style.display = "block";
          const btnCerrar = card.querySelector("button");
          btnCerrar.addEventListener("click", () => {
            card.remove();
            const keys = [];
            for (let i = 0; i < sessionStorage.length; i++) {
              const key = sessionStorage.key(i);
              if (key && (key.startsWith("comp") || key.startsWith("pc"))) {
                keys.push(key);
              }
            }
            keys.forEach((key) => sessionStorage.removeItem(key));
            ArmarElcarrito();
          });
        });
    } else {
      if (tablaProductosCarrito) {
        tablaProductosCarrito.innerHTML =
          "<p>No hay productos en el carrito</p>";
      }
    }
  }

  //Funcion para mostrar en detalle todo lo que tiene la pc armada:
  function mostrarDetalles(pc, containerPC) {
    let tablaHTML = `
      <div class = "titulo"><h2>Componentes de la PC</h2></div>
      <table style ="width : 75%; heigth: 75%; gap : 40px">
      <tr style = "display: grid; grid-template-columns: 1fr 1fr 1fr;">
        <th>Nombre</th>
        <th>Precio</th>
        <th>Caracteristicas</th>
      </tr>`;
    pc.componentes.forEach((element) => {
      tablaHTML += `
      <tr style = "display:grid; grid-template-columns: 1fr 1fr 1fr">
        <td style="justify-self :  center">${element.nombre}</td>
        <td style="justify-self :  center">${element.precio}</td>
        <td style="justify-self :  center">${
          Array.isArray(element.arrayCompatibilidad)
            ? element.arrayCompatibilidad.join(", ")
            : ""
        }</td>`;
    });
    tablaHTML += `</table>`;
    containerPC.innerHTML = tablaHTML;
    //Ademas agregamos el total, con el recargo de armado, y el subtotal con el precio de los componentes:
    const subtotalpunto = preciosPunto(pc.calcularSubTotal(pc.componentes));
    const subtotal = pc.calcularSubTotal(pc.componentes);
    const total = pc.calcularTotal(subtotal);
    const totalpunto = preciosPunto(pc.calcularTotal(subtotal));
    containerPC.innerHTML += `
      <div style ="display : flex;flex-flow: row nowrap; justify-content: space-between; width:20% ; heigth: 20%; margin-top: 20px; background-color: rgba(0,0,0,0.1); color: black; justify-self: center">
      <h5>Subtotal:</h5>
      <h5 style= "color: black; font-weight: bold">${subtotalpunto} $ ARS</h5>
      </div>
      <h2 style= "font-size: 15px; justify-self: center"><em>Para el armado de la pc, se cobra un 5% del presupuesto total de la misma</em></h2>
      <div style ="display : flex;flex-flow: row nowrap; justify-content: space-between; width:20% ; heigth: 20%; margin-top: 20px; background-color: rgba(0,0,0,0.1); color: black; justify-self: center">
      <h5>Total:</h5>
      <h5 style= "color: black; font-weight: bold">${totalpunto} $ ARS</h5>
      </div>
      <div style= "display:flex; flex-direction: row; width: 25%; heigth: 10%; justify-self: center; margin-top: 35px; gap: 40px">
      <button id= "enviarCarrito">Enviar al carrito 🛒</button>
      <button id ="continuar">Continuar sin guardar dicha PC</button>
      </div>`;
    let buttonCarro = document.getElementById("enviarCarrito");
    let buttonContinuar = document.getElementById("continuar");
    buttonCarro.addEventListener("click", () => {
      const indice = getIdPc() + 1;
      pcJSON = JSON.stringify(pc);
      sessionStorage.setItem(`pc${indice}`, pcJSON);
      window.location.href = "../index.html";
    });
    buttonContinuar.addEventListener("click", () => {
      window.location.href = "../index.html";
    });
  }

  //Función para elegir el gabinete:
  function elegirGabinete(pc, containerPC) {
    let tablaHTML = `
      <div class = "titulo"><h2>Gabinetes</h2></div>
      <table style ="width : 75%; heigth: 75%; gap : 40px">
      <tr style = "display: grid; grid-template-columns: 1fr 1fr 1fr 1fr ;">
        <th>Nombre</th>
        <th>Precio</th>
        <th>Caracteristicas</th>
        <th>Seleccionar</th>
      </tr>`;
    cases.forEach((element, indice) => {
      tablaHTML += `
      <tr style = "display:grid; grid-template-columns: 1fr 1fr 1fr 1fr">
        <td style="justify-self :  center">${element.nombre}</td>
        <td style="justify-self :  center">${element.precio}</td>
        <td style="justify-self :  center">${
          Array.isArray(element.arrayCompatibilidad)
            ? element.arrayCompatibilidad.join(", ")
            : ""
        }</td>
        <td style="justify-self : center"><button class= "botonSeleccionar" data-indice ="${indice}">✅</button></td>`;
    });
    tablaHTML += `</table>`;
    containerPC.innerHTML = tablaHTML;
    const botones = document.querySelectorAll(".botonSeleccionar");
    for (let boton of botones) {
      boton.addEventListener("click", (e) => {
        const indice = e.target.dataset.indice;
        const seleccion = cases[indice];
        pc.componentes.push(seleccion);
        mostrarDetalles(pc, containerPC);
      });
    }
  }

  //Función para elegir la fuente para la PC:
  function elegirFuente(pc, containerPC, placaVideo = "") {
    let tablaHTML = `
      <div class = "titulo"><h2>Fuentes de alimentación</h2></div>
      <table style ="width : 75%; heigth: 75%; gap : 40px">
      <tr style = "display: grid; grid-template-columns: 1fr 1fr 1fr 1fr ;">
        <th>Nombre</th>
        <th>Precio</th>
        <th>Caracteristicas</th>
        <th>Seleccionar</th>
      </tr>`;
    psus.forEach((element, indice) => {
      tablaHTML += `
      <tr style = "display:grid; grid-template-columns: 1fr 1fr 1fr 1fr">
        <td style="justify-self :  center">${element.nombre}</td>
        <td style="justify-self :  center">${element.precio}</td>
        <td style="justify-self :  center">${
          Array.isArray(element.arrayCompatibilidad)
            ? element.arrayCompatibilidad.join(", ")
            : ""
        }</td>
        <td style="justify-self : center"><button class= "botonSeleccionar" data-indice ="${indice}">✅</button></td>`;
    });
    tablaHTML += `</table>`;
    if (placaVideo !== "") {
      let nombre = placaVideo.nombre.toLowerCase();
      const gpusQueRequieren650W = ["rtx 4070", "rx 6700 xt", "rx 7600"];
      if (
        gpusQueRequieren650W.some((gpuRequerida) =>
          nombre.includes(gpuRequerida)
        )
      ) {
        tablaHTML += `<h3 style="justify-self: center;"><em>Se recomienda una fuente de al menos 650W para la GPU ${placaVideo.nombre}.</em></h3>`;
      } else {
        tablaHTML += `<h3 style="justify-self: center;"><em>Una fuente de 550W para la GPU ${placaVideo.nombre} es suficiente.</em></h3>`;
      }
    } else {
      tablaHTML += `<h3 style="justify-self: center;"><em>No se selecciono una GPU dedicada, cualquier fuente es suficiente.</em></h3>`;
    }
    containerPC.innerHTML = tablaHTML;
    const botones = document.querySelectorAll(".botonSeleccionar");
    for (let boton of botones) {
      boton.addEventListener("click", (e) => {
        const indice = e.target.dataset.indice;
        const seleccion = psus[indice];
        pc.componentes.push(seleccion);
        elegirGabinete(pc, containerPC);
      });
    }
  }

  //Función para elegir GPU:
  function elegirGpu(pc, containerPC) {
    //Primero verificamos si el cliente desesa una gpu dedicada:
    containerPC.innerHTML = `
    <h2 style = "justify-self: center; align-self: center;">¿Desea comprar una Placa de video?</h2>
    <div style = "justify-self: center; align-self: center;">
    <button id = "confirmar">✅</button>
    <button id = "rechazar">⛔</button></div> `;
    const confirmar = document.getElementById("confirmar");
    const rechazar = document.getElementById("rechazar");
    confirmar.addEventListener("click", function confirmar() {
      let tablaHTML = `
      <div class = "titulo"><h2>Placas de video</h2></div>
      <table style ="width : 75%; heigth: 75%; gap : 40px">
      <tr style = "display: grid; grid-template-columns: 1fr 1fr 1fr 1fr ;">
        <th>Nombre</th>
        <th>Precio</th>
        <th>Caracteristicas</th>
        <th>Seleccionar</th>
      </tr>`;
      gpus.forEach((element, indice) => {
        tablaHTML += `
      <tr style = "display:grid; grid-template-columns: 1fr 1fr 1fr 1fr">
        <td style="justify-self :  center">${element.nombre}</td>
        <td style="justify-self :  center">${element.precio}</td>
        <td style="justify-self :  center">${
          Array.isArray(element.arrayCompatibilidad)
            ? element.arrayCompatibilidad.join(", ")
            : ""
        }</td>
        <td style="justify-self : center"><button class= "botonSeleccionar" data-indice ="${indice}">✅</button></td>`;
      });
      tablaHTML += `</table>`;
      containerPC.innerHTML = tablaHTML;
      const botones = document.querySelectorAll(".botonSeleccionar");
      for (let boton of botones) {
        boton.addEventListener("click", (e) => {
          const indice = e.target.dataset.indice;
          const seleccion = gpus[indice];
          pc.componentes.push(seleccion);
          elegirFuente(pc, containerPC, seleccion);
        });
      }
    });
    rechazar.addEventListener("click", () => elegirFuente(pc, containerPC));
  }

  //Función para elegir disco duro:
  function elegirDisco(pc, containerPC) {
    let tablaHTML = `
      <div class = "titulo"><h2>Discos Duros</h2></div>
      <table style ="width : 75%; heigth: 75%; gap : 40px">
      <tr style = "display: grid; grid-template-columns: 1fr 1fr 1fr 1fr ;">
        <th>Nombre</th>
        <th>Precio</th>
        <th>Caracteristicas</th>
        <th>Seleccionar</th>
      </tr>`;
    storages.forEach((element, indice) => {
      tablaHTML += `
      <tr style = "display:grid; grid-template-columns: 1fr 1fr 1fr 1fr">
        <td style="justify-self :  center">${element.nombre}</td>
        <td style="justify-self :  center">${element.precio}</td>
        <td style="justify-self :  center">${
          Array.isArray(element.arrayCompatibilidad)
            ? element.arrayCompatibilidad.join(", ")
            : ""
        }</td>
        <td style="justify-self : center"><button class= "botonSeleccionar" data-indice ="${indice}">✅</button></td>`;
    });
    tablaHTML += `</table>`;
    containerPC.innerHTML = tablaHTML;
    const botones = document.querySelectorAll(".botonSeleccionar");
    for (let boton of botones) {
      boton.addEventListener("click", (e) => {
        const indice = e.target.dataset.indice;
        const seleccion = storages[indice];
        pc.componentes.push(seleccion);
        elegirGpu(pc, containerPC);
      });
    }
  }

  //Función para elegir las memorias RAM:
  function elegirRams(pc, containerPC, placaMadre) {
    let opciones = function opciones() {
      return placaMadre.slotRam === 2
        ? `<option>1</option><option>2</option>`
        : `<option>1</option><option>2</option><option>4</option>`;
    };
    let tablaHTML = `
      <div class = "titulo"><h2>Memorias Ram</h2></div>
      <table style ="width : 75%; heigth: 75%; gap : 40px">
      <tr style = "display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr;">
        <th>Nombre</th>
        <th>Precio</th>
        <th>Compatibilidades</th>
        <th>Seleccionar</th>
        <th>Cantidad</th>
      </tr>`;
    rams.forEach((element, indice) => {
      tablaHTML += `
      <tr style = "display:grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr">
        <td style="justify-self :  center">${element.nombre}</td>
        <td style="justify-self :  center">${element.precio}</td>
        <td style="justify-self :  center">${
          Array.isArray(element.arrayCompatibilidad)
            ? element.arrayCompatibilidad.join(", ")
            : ""
        }</td>
        <td style="justify-self : center"><select class = "cantidadRams"><option value="" selected disabled>Cantidad de Rams</option>${opciones()}</select></td>
        <td style="justify-self : center"><button class= "botonSeleccionar" data-indice ="${indice}">✅</button></td>
      </tr>
    `;
    });
    tablaHTML += `</table> <h4 style= "justify-self:center;">Si no selecciona una cantidad, por defecto colocamos una(1) ram de la seleccionada</h4>`;
    containerPC.innerHTML = tablaHTML;
    const botones = document.querySelectorAll(".botonSeleccionar");
    for (let boton of botones) {
      boton.addEventListener("click", (e) => {
        const indice = e.target.dataset.indice;
        const seleccion = rams[indice];

        const fila = e.target.closest("tr");
        const select = fila.querySelector(".cantidadRams");

        let cantidad = parseInt(select.value.trim());
        if (isNaN(cantidad)) cantidad = 1;

        for (let i = 0; i < cantidad; i++) {
          pc.componentes.push(seleccion);
        }
        elegirDisco(pc, containerPC);
      });
    }
  }

  //Funcion para elegir los procesadores:
  function elegirProcesador(pc, containerPC) {
    let placaMadre = pc.componentes[0];
    let chipset = placaMadre.caracteristica;
    const compatibles = cpus.filter((cpu) =>
      cpu.arrayCompatibilidad.includes(chipset)
    );
    let tablaHTML = `
      <div class = "titulo"><h2>Procesadores compatibles con la placa madre: ${placaMadre.nombre}</h2></div>
      <table style ="width : 75%; heigth: 75%; gap : 40px">
      <tr style = "display: grid; grid-template-columns: 1fr 1fr 1fr 1fr;">
        <th>Nombre</th>
        <th>Precio</th>
        <th>Compatibilidades</th>
        <th>Seleccionar</th>
      </tr>`;
    compatibles.forEach((element, indice) => {
      tablaHTML += `
      <tr style = "display:grid; grid-template-columns: 1fr 1fr 1fr 1fr">
        <td style="justify-self :  center">${element.nombre}</td>
        <td style="justify-self :  center">${element.precio}</td>
        <td style="justify-self :  center">${
          Array.isArray(element.arrayCompatibilidad)
            ? element.arrayCompatibilidad.join(", ")
            : ""
        }</td>
        <td style="justify-self :  center"><button class= "botonSeleccionar" data-indice ="${indice}">✅</button></td>
      </tr>
    `;
    });
    tablaHTML += `</table>`;
    containerPC.innerHTML = tablaHTML;
    const botones = document.querySelectorAll(".botonSeleccionar");
    for (let boton of botones) {
      boton.addEventListener("click", (e) => {
        const indice = e.target.dataset.indice;
        const seleccion = compatibles[indice];
        pc.componentes.push(seleccion);
        elegirRams(pc, containerPC, placaMadre);
      });
    }
  }

  //Funcion para elegir placa madre:

  function elegirPlacaMadre(pc) {
    let containerPC = document.getElementById("armarPC");
    containerPC.innerHTML = `
    <div><h2>Placas Madre</h2>
    <h3>¿Desea una placa Madre Intel o una placa madre AMD?</h3>
    <button id = "placaI">Placa madre Intel</button>
    <button id = "placaA">Placa madre AMD</button>
    </div>`;
    let botonI = document.getElementById("placaI");
    let botonA = document.getElementById("placaA");
    botonI.addEventListener("click", () => {
      let tablaHTML = `
      <div class = "titulo"><h2>Placas Madre Intel</h2></div>
      <table style ="width : 75%; heigth: 75%; gap : 40px">
      <tr style = "display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr;">
        <th>nombre</th>
        <th>precio</th>
        <th>compatible</th>
        <th>Slots de Memorias Ram</th>
        <th>Seleccionar</th>
      </tr>
  `;
      motherBoardsIntel.forEach((element, indice) => {
        tablaHTML += `
      <tr style = "display:grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr">
        <td style="justify-self :  center">${element.nombre}</td>
        <td style="justify-self :  center">${element.precio}</td>
        <td style="justify-self :  center">${
          Array.isArray(element.arrayCompatibilidad)
            ? element.arrayCompatibilidad.join(", ")
            : ""
        }</td>
        <td style="justify-self :  center">${element.slotRam}</td>
        <td style="justify-self :  center"><button class= "botonSeleccionar" data-indice ="${indice}">✅</button></td>
      </tr>
    `;
      });
      tablaHTML += `</table>`;
      containerPC.innerHTML = tablaHTML;
      //Asignamos un evento a cada boton de la tabla para agregar dicho producto a la pc.
      const botones = document.querySelectorAll(".botonSeleccionar");
      botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
          const indice = e.target.dataset.indice;
          const seleccion = motherBoardsIntel[indice];
          pc.componentes.push(seleccion);
          elegirProcesador(pc, containerPC);
        });
      });
    });

    botonA.addEventListener("click", () => {
      let tablaHTML = `
      <div class = "titulo"><h2>Placas Madre AMD</h2></div>
      <table style ="width : 75%; heigth: 75%; gap : 40px">
      <tr style = "display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr;">
        <th>nombre</th>
        <th>precio</th>
        <th>compatible</th>
        <th>Slots de Memorias Ram</th>
        <th>Seleccionar</th>
      </tr>
  `;
      motherBoardsAMD.forEach((element, indice) => {
        tablaHTML += `
      <tr style = "display:grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr">
        <td style="justify-self :  center">${element.nombre}</td>
        <td style="justify-self :  center">${element.precio}</td>
        <td style="justify-self :  center">${
          Array.isArray(element.arrayCompatibilidad)
            ? element.arrayCompatibilidad.join(", ")
            : ""
        }</td>
        <td style="justify-self :  center">${element.slotRam}</td>
        <td style="justify-self :  center"><button class= "botonSeleccionar" data-indice ="${indice}">✅</button></td>
      </tr>
    `;
      });
      tablaHTML += `</table>`;
      containerPC.innerHTML = tablaHTML;

      const botones = document.querySelectorAll(".botonSeleccionar");
      for (let boton of botones) {
        boton.addEventListener("click", (e) => {
          const indice = e.target.dataset.indice;
          const seleccion = motherBoardsAMD[indice];
          pc.componentes.push(seleccion);
          elegirProcesador(pc, containerPC);
        });
      }
    });
  }
  //Función para armar la PC:

  let comenzar = document.getElementById("comenzar");
  if (comenzar) {
    comenzar.addEventListener("click", armarPC);
    function armarPC() {
      let pc = new Pc();
      elegirPlacaMadre(pc);
    }
  }
  window.addEventListener("DOMContentLoaded", () => {
    ArmarElcarrito();
  });
})();
