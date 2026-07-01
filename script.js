// Arreglo principal con las experiencias turísticas sostenibles.
const experiencias = [
  {
    id: 1,
    nombre: "Capillas de Mármol",
    categoria: "Navegación",
    lugar: "Coyhaique",
    precio: 120000,
    cuposDisponibles: 12,
    descripcion:
      "Navegación en un paisaje de mármol blanco y aguas turquesas, con enfoque en bajo impacto y guías locales.",
    icono: "❄️"
  },
  {
    id: 2,
    nombre: "Cerro Castillo",
    categoria: "Trekking",
    lugar: "Cochrane",
    precio: 90000,
    cuposDisponibles: 8,
    descripcion:
      "Caminata guiada por lagos, bosques y miradores con límites de grupo para cuidar el sendero.",
    icono: "🏔️"
  },
  {
    id: 3,
    nombre: "Laguna San Rafael",
    categoria: "Navegación",
    lugar: "Puerto Aysén",
    precio: 180000,
    cuposDisponibles: 6,
    descripcion:
      "Excursión náutica para observar glaciares y fauna marina desde una perspectiva responsable.",
    icono: "🛶"
  },
  {
    id: 4,
    nombre: "Pesca con Mosca",
    categoria: "Pesca",
    lugar: "Chile Chico",
    precio: 110000,
    cuposDisponibles: 5,
    descripcion:
      "Experiencia de pesca en ríos y lagos con prácticas de conservación y devolución de especies.",
    icono: "🎣"
  },
  {
    id: 5,
    nombre: "Kayak en Fiordos",
    categoria: "Kayak",
    lugar: "Caleta Tortel",
    precio: 95000,
    cuposDisponibles: 10,
    descripcion:
      "Recorridos en kayak por aguas tranquilas y paisajes de fiordos con guía especializada.",
    icono: "🚣"
  },
  {
    id: 6,
    nombre: "Carretera Austral",
    categoria: "Circuito",
    lugar: "Aysén",
    precio: 130000,
    cuposDisponibles: 14,
    descripcion:
      "Circuito guiado por puentes, fiordos y pueblos del sur, promoviendo un viaje lento y sostenible.",
    icono: "🛣️"
  }
];

const grid = document.getElementById("experienciasGrid");
const selectExperiencia = document.getElementById("experiencia");
const botonFiltro = document.querySelectorAll(".filtro");
const formulario = document.getElementById("formReserva");
const mensajeExito = document.getElementById("mensajeExito");
let categoriaActual = "todas";

// Renderiza las tarjetas en base al arreglo y la categoría seleccionada.
function renderExperiencias(lista = experiencias) {
  grid.innerHTML = "";

  if (lista.length === 0) {
    grid.innerHTML = '<p class="empty-state">No hay experiencias para esta categoría.</p>';
    return;
  }

  lista.forEach((experiencia) => {
    grid.appendChild(crearTarjeta(experiencia));
  });
}

// Crea una tarjeta de experiencia desde un objeto.
function crearTarjeta(experiencia) {
  const article = document.createElement("article");
  article.className = "card";
  article.innerHTML = `
    <div class="card__icono">${experiencia.icono}</div>
    <div class="card__meta">
      <h3>${experiencia.nombre}</h3>
      <span>$${experiencia.precio.toLocaleString("es-CL")}</span>
    </div>
    <p><strong>Categoría:</strong> ${experiencia.categoria}</p>
    <p><strong>Lugar:</strong> ${experiencia.lugar}</p>
    <p><strong>Cupos:</strong> ${experiencia.cuposDisponibles}</p>
    <p class="card__descripcion" hidden>${experiencia.descripcion}</p>
    <button class="card__toggle" type="button" aria-expanded="false">Ver más</button>
  `;

  const toggleButton = article.querySelector(".card__toggle");
  const descripcion = article.querySelector(".card__descripcion");

  toggleButton.addEventListener("click", () => {
    const estaAbierto = article.classList.toggle("is-open");
    descripcion.hidden = !estaAbierto;
    toggleButton.textContent = estaAbierto ? "Ver menos" : "Ver más";
    toggleButton.setAttribute("aria-expanded", String(estaAbierto));
  });

  return article;
}

// Filtra las experiencias por categoría y actualiza los botones.
function filtrarPorCategoria(categoria) {
  categoriaActual = categoria;

  const filtradas =
    categoria === "todas"
      ? experiencias
      : experiencias.filter((experiencia) => experiencia.categoria === categoria);

  botonFiltro.forEach((boton) => {
    const coincide = boton.dataset.categoria === categoria;
    boton.classList.toggle("active", coincide);
    boton.setAttribute("aria-pressed", String(coincide));
  });

  renderExperiencias(filtradas);
}

// Llena el select del formulario a partir del arreglo.
function actualizarSelectExperiencias() {
  selectExperiencia.innerHTML = '<option value="">Selecciona una experiencia</option>';

  experiencias.forEach((experiencia) => {
    const option = document.createElement("option");
    option.value = experiencia.id;
    option.textContent = `${experiencia.nombre} (${experiencia.cuposDisponibles} cupos)`;
    selectExperiencia.appendChild(option);
  });
}

// Muestra un mensaje de error junto al campo.
function mostrarError(idCampo, mensaje) {
  const campoError = document.getElementById(`error-${idCampo}`);
  if (campoError) {
    campoError.textContent = mensaje;
  }
}

// Limpia todos los mensajes de error del formulario.
function limpiarErrores() {
  document.querySelectorAll(".error").forEach((elemento) => {
    elemento.textContent = "";
  });
  mensajeExito.textContent = "";
}

// Valida el formulario y gestiona la reserva.
function validarFormulario() {
  limpiarErrores();

  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const experienciaId = selectExperiencia.value;
  const cantidad = Number(document.getElementById("cantidad").value);
  const fecha = document.getElementById("fecha").value;

  let valido = true;

  if (!nombre) {
    mostrarError("nombre", "El nombre completo es obligatorio.");
    valido = false;
  }

  if (!email) {
    mostrarError("email", "El correo electrónico es obligatorio.");
    valido = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    mostrarError("email", "Ingresa un correo electrónico válido.");
    valido = false;
  }

  if (!experienciaId) {
    mostrarError("experiencia", "Debes seleccionar una experiencia.");
    valido = false;
  }

  if (!cantidad || cantidad <= 0) {
    mostrarError("cantidad", "La cantidad de personas debe ser mayor a cero.");
    valido = false;
  }

  if (!fecha) {
    mostrarError("fecha", "La fecha es obligatoria.");
    valido = false;
  }

  if (valido && experienciaId) {
    const experienciaSeleccionada = experiencias.find(
      (item) => item.id === Number(experienciaId)
    );

    if (!experienciaSeleccionada) {
      mostrarError("experiencia", "La experiencia no está disponible.");
      return false;
    }

    if (cantidad > experienciaSeleccionada.cuposDisponibles) {
      mostrarError("cantidad", `Solo quedan ${experienciaSeleccionada.cuposDisponibles} cupos disponibles.`);
      return false;
    }

    experienciaSeleccionada.cuposDisponibles -= cantidad;
    mensajeExito.textContent = `Reserva confirmada para ${nombre}. Se han descontado ${cantidad} cupo(s) de ${experienciaSeleccionada.nombre}.`;
    formulario.reset();
    actualizarSelectExperiencias();
    filtrarPorCategoria(categoriaActual);
    return true;
  }

  return false;
}

// Asigna eventos de interacción.
function configurarInteracciones() {
  botonFiltro.forEach((boton) => {
    boton.addEventListener("click", () => {
      filtrarPorCategoria(boton.dataset.categoria);
    });
  });

  formulario.addEventListener("submit", (event) => {
    event.preventDefault();
    validarFormulario();
  });

  document.querySelectorAll("input, select").forEach((campo) => {
    campo.addEventListener("input", () => {
      const campoId = campo.id;
      const errorElement = document.getElementById(`error-${campoId}`);
      if (errorElement) {
        errorElement.textContent = "";
      }
    });
  });
}

// Inicializa la plataforma al cargar la página.
function iniciarAplicacion() {
  actualizarSelectExperiencias();
  filtrarPorCategoria("todas");
  configurarInteracciones();
}

iniciarAplicacion();
//  Código generado con IA
