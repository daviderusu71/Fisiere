const toggle = document.getElementById('darkModeToggle');

toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  toggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

const testimonials = document.querySelectorAll(".testimonial-card");
let current = 0;

function showTestimonial(index) {
  testimonials.forEach((card, i) => {
    card.classList.toggle("active", i === index);
  });
}

document.getElementById("prevTestimonial").addEventListener("click", () => {
  current = (current - 1 + testimonials.length) % testimonials.length;
  showTestimonial(current);
});

document.getElementById("nextTestimonial").addEventListener("click", () => {
  current = (current + 1) % testimonials.length;
  showTestimonial(current);
});

const form = document.getElementById("contactForm");
const successMessage = document.getElementById("formSuccess");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  clearErrors();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  let valid = true;

  if (name === "") {
    setError("name", "Completează numele.");
    valid = false;
  }

  if (email === "") {
    setError("email", "Completează emailul.");
    valid = false;
  } else if (!validateEmail(email)) {
    setError("email", "Email invalid.");
    valid = false;
  }

  if (message === "") {
    setError("message", "Scrie un mesaj.");
    valid = false;
  }

  if (!valid) return;

  // Construiește mailto
  const subject = encodeURIComponent(`Mesaj de la ${name}`);
  const body = encodeURIComponent(`Nume: ${name}\nEmail: ${email}\n\nMesaj:\n${message}`);

  const mailtoLink = `mailto:davidrusu556@gmail.com?subject=${subject}&body=${body}`;

  window.location.href = mailtoLink;

  successMessage.textContent = "Mesajul a fost pregătit pentru trimitere. Verifică clientul de email.";
  form.reset();
});

function setError(fieldId, message) {
  const input = document.getElementById(fieldId);
  const errorEl = input.nextElementSibling.nextElementSibling;
  errorEl.textContent = message;
  input.style.borderColor = "#d93025";
}

function clearErrors() {
  const errors = document.querySelectorAll(".error-message");
  errors.forEach((el) => (el.textContent = ""));
  const inputs = form.querySelectorAll("input, textarea");
  inputs.forEach((input) => (input.style.borderColor = ""));
}

function validateEmail(email) {
  // Simplu regex validare email
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

const newsletterForm = document.getElementById("newsletterForm");
const newsletterMsg = document.getElementById("newsletterMsg");

newsletterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const emailInput = newsletterForm.newsletterEmail.value.trim();

  if (!validateEmail(emailInput)) {
    newsletterMsg.style.color = "#d93025"; // roșu
    newsletterMsg.textContent = "Te rugăm să introduci un email valid.";
    return;
  }

  newsletterMsg.style.color = "#198754"; // verde
  newsletterMsg.textContent = `Mulțumim pentru abonare, ${emailInput}!`;

  newsletterForm.reset();

  // Aici poți adăuga trimiterea către server / serviciu de newsletter
});



document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxMedia = lightbox.querySelector('.lightbox-media');
    const closeBtn = lightbox.querySelector('.close');

    document.querySelectorAll('.galerie-item').forEach(item => {
      item.addEventListener('click', () => {
        const type = item.getAttribute('data-type');
        const src = item.getAttribute('data-src');
        lightboxMedia.innerHTML = '';

        if (type === 'image') {
          const img = document.createElement('img');
          img.src = src;
          lightboxMedia.appendChild(img);
        } else if (type === 'video') {
          const iframe = document.createElement('iframe');
          iframe.src = src + '?autoplay=1&rel=0';
          iframe.frameBorder = '0';
          iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
          iframe.allowFullscreen = true;
          lightboxMedia.appendChild(iframe);
        }

        lightbox.classList.add('visible');
      });
    });

    closeBtn.addEventListener('click', () => {
      lightbox.classList.remove('visible');
      lightboxMedia.innerHTML = '';
    });

    // Închide lightbox la click în afara conținutului
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('visible');
        lightboxMedia.innerHTML = '';
      }
    });

    // Închide lightbox la ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === "Escape" && lightbox.classList.contains('visible')) {
        lightbox.classList.remove('visible');
        lightboxMedia.innerHTML = '';
      }
    });
  });

 document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', !expanded);

      const answer = button.nextElementSibling;
      if (!expanded) {
        answer.classList.add('open');
      } else {
        answer.classList.remove('open');
      }
    });
  });

  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Toggle menu pe mobil
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    navToggle.classList.toggle('open');
  });

  // Închide meniul la click pe link (mobil)
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.classList.remove('open');
    });
  });

  // Scroll smooth + schimbare active link la scroll
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 80; // 80px offset navbar fix
    navLinks.forEach(link => {
      const section = document.querySelector(link.getAttribute('href'));
      if (
        section.offsetTop <= scrollPos &&
        section.offsetTop + section.offsetHeight > scrollPos
      ) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });

  // Smooth scroll pentru click pe link
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      const targetSection = document.getElementById(targetId);
      targetSection.scrollIntoView({ behavior: 'smooth' });
    });
  });