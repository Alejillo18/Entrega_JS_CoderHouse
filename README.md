# Proyecto Final: Simulador de Armado de PC – Oviedo


## 🎯 Descripción  
Simulador interactivo de armado de computadoras. Permite al usuario seleccionar paso a paso cada componente (placa madre, CPU, RAM, GPU, etc.), comprobar compatibilidades, y simular el proceso completo de compra.


## 📦 Estructura del proyecto  
```
Entrega_JS_CoderHouse/
├── index.html
├── armado_pc.html
├── agregar_comp.html
├── componentes.json           #cargado vía fetch
├── css/
│   └── style.css
├── js/
│   ├── main.js                # Lógica de armado y fetch
│   └── tema.js                # Cambio de tema claro/oscuro
└── README.md
```

## ⚙️ Instalación y ejecución  
1. Clonar el repositorio:  
   ```bash
   git clone https://github.com/Alejillo18/Entrega_JS_CoderHouse.git
   ```  
2. Abrir `index.html` en tu navegador (no requiere servidor).  
3. Asegúrate de que `componentes.json` esté en la misma carpeta para la carga remota simulada.  

## 🛠️ Tecnologías  
- **HTML5** + **CSS3** + **Bootstrap**  
- **JavaScript** (ES6+, fetch API, DOM, eventos, módulos)  
- **SweetAlert2** para notificaciones  
- **localStorage** / **sessionStorage** para persistencia  

## 📑 Funcionalidades  
- Carga asíncrona de datos de `componentes.json` via `fetch`.  
- Generación dinámica de HTML (JS + DOM).  
- Validación de compatibilidades (CPU ↔ placa madre)(GPU - PSU).  
- Carrito de PCs con persistencia en sesión.  
- Cambio de tema claro/oscuro guardado en `localStorage`.  
- Interactor limpio (sin `console.log` ni `alert()` nativos).


## ✅ Criterios de evaluación  
1. **Funcionalidad**: Flujo completo de armado y carrito sin errores.  
2. **Interactividad**: Captura de entradas con inputs y eventos; actualizaciones asíncronas.  
3. **Escalabilidad**: Uso de funciones parametrizadas, objetos, arrays y optimización de recorridos.  
4. **Integridad**: JS en archivos externos, JSON cargado asíncronamente.  
5. **Legibilidad**: Nombres semánticos, comentarios puntuales y código bien organizado.

## 👨‍💻 Autor

**Alejo Oviedo**  
Proyecto realizado para el curso de JavaScript en [CoderHouse](https://www.coderhouse.com/)