// script.js
document.addEventListener("DOMContentLoaded", () => {
  // Referências de elementos principais
  const navToggle = document.getElementById("navToggle");
  const offcanvas = document.getElementById("offcanvas");
  const offBackdrop = document.getElementById("offBackdrop");
  const offClose = document.getElementById("offcanvasClose");
  const offLinks = document.querySelectorAll(".off-link");
  const siteHeader = document.getElementById("siteHeader");
  const cards = document.querySelectorAll(".card");
  const ctaCards = document.getElementById("ctaCards");

  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const waBtn = document.getElementById("whatsappBtn");
  const waNumberInput = document.getElementById("waNumber");
  const formFeedback = document.getElementById("formFeedback");


  function openOffcanvas() {
    offcanvas.classList.add("open");
    offBackdrop.hidden = false;
    offcanvas.setAttribute("aria-hidden", "false");
    navToggle.setAttribute("aria-expanded", "true");
    offClose.focus();
  }

  function closeOffcanvas() {
    offcanvas.classList.remove("open");
    offBackdrop.hidden = true;
    offcanvas.setAttribute("aria-hidden", "true");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.focus();
  }

  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    if (!expanded) openOffcanvas();
    else closeOffcanvas();
  });

  offClose.addEventListener("click", closeOffcanvas);
  offBackdrop.addEventListener("click", closeOffcanvas);
  offLinks.forEach((link) => link.addEventListener("click", closeOffcanvas));


  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && offcanvas.classList.contains("open")) {
      closeOffcanvas();
    }
  });

 
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) siteHeader.classList.add("scrolled");
    else siteHeader.classList.remove("scrolled");
  });


  cards.forEach((card) => {
    card.addEventListener("mouseover", () => card.classList.add("hovered"));
    card.addEventListener("mouseout", () => card.classList.remove("hovered"));
    card.addEventListener("focus", () => card.classList.add("hovered"));
    card.addEventListener("blur", () => card.classList.remove("hovered"));
  });


  if (ctaCards) {
    ctaCards.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector("#cards").scrollIntoView({ behavior: "smooth" });
    });
  }

  function showError(el, msg) {
    const err = document.getElementById(
      "err" + el.id.charAt(0).toUpperCase() + el.id.slice(1)
    );
    if (err) err.textContent = msg;
    el.setAttribute("aria-invalid", "true");
  }

  function clearError(el) {
    const err = document.getElementById(
      "err" + el.id.charAt(0).toUpperCase() + el.id.slice(1)
    );
    if (err) err.textContent = "";
    el.removeAttribute("aria-invalid");
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;
    formFeedback.textContent = "";

    
    if (!nameInput.value || nameInput.value.trim().length < 2) {
      showError(nameInput, "Por favor, insira seu nome (mín. 2 caracteres).");
      valid = false;
    } else clearError(nameInput);


    if (!emailInput.checkValidity()) {
      showError(emailInput, "Informe um email válido.");
      valid = false;
    } else clearError(emailInput);

    if (!messageInput.value || messageInput.value.trim().length < 10) {
      showError(messageInput, "A mensagem deve ter pelo menos 10 caracteres.");
      valid = false;
    } else clearError(messageInput);

    if (valid) {
      formFeedback.textContent =
        "Formulário válido — pronto para enviar via WhatsApp.";
      formFeedback.style.color = "green";
      openWhatsApp(); 
    } else {
      formFeedback.style.color = "#b91c1c";
    }
  });

  function sanitizeNumber(num) {
    return (num || "").replace(/\D/g, ""); 
  }

  function openWhatsApp() {
    const rawNum = sanitizeNumber(waNumberInput.value);
    if (!rawNum) {
      alert("Número do WhatsApp não configurado corretamente!");
      return;
    }

    const name = nameInput.value.trim() || "---";
    const email = emailInput.value.trim() || "---";
    const message = messageInput.value.trim() || "---";

    const encodedText = encodeURIComponent(
      `Olá! Meu nome é ${name}\nEmail: ${email}\nMensagem: ${message}`
    );

    const url = `https://wa.me/${rawNum}?text=${encodedText}`;

    window.location.href = url;
  }

  waBtn.addEventListener("click", () => {
    let ok = true;
    if (!nameInput.value || nameInput.value.trim().length < 2) {
      showError(nameInput, "Nome inválido.");
      ok = false;
    }
    if (!emailInput.checkValidity()) {
      showError(emailInput, "Email inválido.");
      ok = false;
    }
    if (!messageInput.value || messageInput.value.trim().length < 10) {
      showError(messageInput, "Mensagem muito curta.");
      ok = false;
    }

    if (ok) {
      openWhatsApp(); 
    } else {
      formFeedback.textContent =
        "Corrija os erros antes de enviar via WhatsApp.";
      formFeedback.style.color = "#b91c1c";
    }
  });

  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});
