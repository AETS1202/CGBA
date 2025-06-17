// Script para el menú responsivo y las pestañas
document.addEventListener("DOMContentLoaded", function () {
  // Menú responsivo
  const menuToggle = document.getElementById("menuToggle");
  const menuPrincipal = document.getElementById("menuPrincipal");

  if (menuToggle && menuPrincipal) {
    menuToggle.addEventListener("click", function () {
      menuPrincipal.classList.toggle("mostrar");
    });

    // Ocultar menú al hacer clic en un enlace
    const menuLinks = menuPrincipal.querySelectorAll("a");
    menuLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.innerWidth < 768) {
          menuPrincipal.classList.remove("mostrar");
        }
      });
    });

    // Reajustar menú en cambio de tamaño de ventana
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 768) {
        menuPrincipal.classList.remove("mostrar");
      }
    });
  }
});

// Sistema de pestañas
const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanes = document.querySelectorAll(".tab-pane");

tabButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    // Remover clase active de todos los botones
    tabButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });

    // Añadir clase active al botón clickeado
    this.classList.add("active");

    // Obtener el id del tab a mostrar
    const tabId = this.getAttribute("data-tab");

    // Ocultar todos los paneles de tabs
    tabPanes.forEach(function (pane) {
      pane.classList.remove("active");
    });

    // Mostrar el panel correspondiente
    document.getElementById(tabId).classList.add("active");
  });
});

// Variables para el carrusel
document.addEventListener("DOMContentLoaded", function () {
  const carruselSlide = document.getElementById("carruselSlide");
  const carruselItems = document.querySelectorAll(".carrusel-item");
  const modal = document.getElementById("imagenModal");
  const modalImg = document.getElementById("imagenAmpliada");
  const modalCaption = document.getElementById("modalCaption");
  const closeModal = document.querySelector(".cerrar-modal");

  let contador = 0;
  const tamaño = carruselItems[0].clientWidth;

  // Clona el primer y último elemento
  const primerItem = carruselItems[0];
  const ultimoItem = carruselItems[carruselItems.length - 1];
  const primerItemClonado = primerItem.cloneNode(true);
  const ultimoItemClonado = ultimoItem.cloneNode(true);

  // Agrega los clones al inicio y al final
  carruselSlide.appendChild(primerItemClonado);
  carruselSlide.insertBefore(ultimoItemClonado, primerItem);

  // Ajustar posición inicial (mostrando el primer elemento real)
  carruselSlide.style.transform = `translateX(-${tamaño}px)`;

  // Función para mover el carrusel
  function moverCarrusel(direccion) {
    if (direccion === "next") {
      contador++;
      carruselSlide.style.transition = "transform 0.5s ease-in-out";
      carruselSlide.style.transform = `translateX(-${
        tamaño * (contador + 1)
      }px)`;
    } else if (direccion === "prev") {
      contador--;
      carruselSlide.style.transition = "transform 0.5s ease-in-out";
      carruselSlide.style.transform = `translateX(-${
        tamaño * (contador + 1)
      }px)`;
    }

    // Manejar el loop infinito
    carruselSlide.addEventListener("transitionend", () => {
      if (contador === carruselItems.length) {
        contador = 0;
        carruselSlide.style.transition = "none";
        carruselSlide.style.transform = `translateX(-${tamaño}px)`;
      }

      if (contador === -1) {
        contador = carruselItems.length - 1;
        carruselSlide.style.transition = "none";
        carruselSlide.style.transform = `translateX(-${
          tamaño * carruselItems.length
        }px)`;
      }
    });
  }

  // Eventos de los botones
  nextBtn.addEventListener("click", () => moverCarrusel("next"));
  prevBtn.addEventListener("click", () => moverCarrusel("prev"));

  // Ajuste del carrusel al cambiar el tamaño de la ventana
  window.addEventListener("resize", () => {
    const nuevoTamaño = carruselItems[0].clientWidth;
    carruselSlide.style.transform = `translateX(-${tamaño * (contador + 1)}px)`;
  });

  // Manejar evento de clic para abrir el modal
  carruselItems.forEach((item) => {
    const img = item.querySelector(".carrusel-img");
    img.addEventListener("click", function () {
      modal.style.display = "block";
      modalImg.src = this.src; // Usar la imagen clickeada
      modalCaption.textContent = this.alt; // Usar el alt como descripción
    });
  });
  // Cerrar modal al hacer clic en la "X"
  closeModal.addEventListener("click", function () {
    modal.style.display = "none";
  });
  // Cerrar modal al hacer clic fuera de la imagen
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});

// Animación de aparición para las cards de actividades
document.addEventListener("DOMContentLoaded", function () {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observar las cards de actividades
  const actividadCards = document.querySelectorAll(".actividad-card");
  actividadCards.forEach((card, index) => {
    // Configuración inicial
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = `opacity 0.6s ease ${
      index * 0.2
    }s, transform 0.6s ease ${index * 0.2}s`;

    observer.observe(card);
  });
});

//Ver los videos de youtube
document.addEventListener("DOMContentLoaded", function () {
  const videoItems = document.querySelectorAll(".video-item");
  const videoModal = document.getElementById("videoModal");
  const youtubePlayerDiv = document.getElementById("youtubePlayer");
  const cerrarModalVideo = document.querySelector(".cerrar-modal-video");

  videoItems.forEach((item) => {
    item.addEventListener("click", function () {
      const youtubeId = this.getAttribute("data-youtube-id");
      youtubePlayerDiv.innerHTML = `<iframe src="https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      videoModal.style.display = "flex"; // Usar flex para centrar
    });
  });

  cerrarModalVideo.addEventListener("click", function () {
    youtubePlayerDiv.innerHTML = ""; // Detener el video al cerrar
    videoModal.style.display = "none";
  });

  // Cerrar el modal si se hace clic fuera del contenido del video
  window.addEventListener("click", function (event) {
    if (event.target === videoModal) {
      youtubePlayerDiv.innerHTML = ""; // Detener el video
      videoModal.style.display = "none";
    }
  });




});
