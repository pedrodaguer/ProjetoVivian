// =============================
// GSAP — REGISTRO DO PLUGIN
// =============================
gsap.registerPlugin(ScrollTrigger);

// =============================
// HERO ANIMATION
// =============================
const heroTl = gsap.timeline({ delay: 0.2 });
heroTl
  .to('.hero-monogram',  { opacity: 1, duration: 0.6, ease: 'power2.out' })
  .to('.hero-eyebrow',   { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2')
  .to('.hero-name',      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
  .to('.hero-tagline',   { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
  .to('.hero-logo',      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.2')
  .to('.hero-actions',   { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.2')
  .to('.hero-scroll',    { opacity: 1, duration: 0.5 }, '-=0.2');

// =============================
// SCROLL REVEAL
// =============================
gsap.utils.toArray('.reveal').forEach(el => {
  gsap.fromTo(el,
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    }
  );
});

gsap.utils.toArray('.reveal-left').forEach(el => {
  gsap.fromTo(el,
    { opacity: 0, x: -50 },
    { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    }
  );
});

gsap.utils.toArray('.reveal-right').forEach(el => {
  gsap.fromTo(el,
    { opacity: 0, x: 50 },
    { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    }
  );
});

// =============================
// NAVBAR SCROLL
// =============================
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// =============================
// COUNTERS
// =============================
document.querySelectorAll('.counter').forEach(counter => {
  const target = parseInt(counter.dataset.target);
  ScrollTrigger.create({
    trigger: counter,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      gsap.fromTo(counter,
        { textContent: 0 },
        { textContent: target, duration: 1.5, ease: 'power2.out', snap: { textContent: 1 },
          onUpdate() { counter.textContent = Math.round(this.targets()[0].textContent); }
        }
      );
    }
  });
});

// =============================
// ACCORDION FORMAÇÃO
// =============================
const formacaoToggle = document.getElementById('formacaoToggle');
const formacaoList = document.getElementById('formacaoList');
if (formacaoToggle && formacaoList) {
  formacaoToggle.addEventListener('click', () => {
    formacaoToggle.classList.toggle('open');
    formacaoList.classList.toggle('open');
  });
}

// Carrossel removido — nova seção de cursos com cards

// =============================
// FORMULÁRIO
// =============================
function handleForm(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-submit');
  btn.textContent = 'Mensagem enviada! ✓';
  btn.style.background = '#1B4332';
  btn.style.color = '#C9A84C';
  setTimeout(() => {
    btn.textContent = 'Enviar mensagem';
    btn.style.background = '';
    btn.style.color = '';
    e.target.reset();
  }, 3000);
}

// =============================
// SMOOTH ACTIVE LINK
// =============================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 140) current = sec.id;
  });
  navLinks.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) a.classList.add('active');
  });
});

// =============================
// HAMBURGER MENU
// =============================
const hamburger = document.getElementById('hamburger');
const navMenu   = document.querySelector('.nav-links');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('nav-open');
    hamburger.setAttribute('aria-expanded', isOpen);
    hamburger.classList.toggle('is-open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('nav-open');
      hamburger.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

// =============================
// PARALLAX HERO (sutil)
// =============================
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    gsap.set(heroBg, { y: scrolled * 0.3 });
  }
});

// =============================
// ÂNCORAS — scroll com offset do nav fixo
// (mesma página = smooth; cross-page = reposiciona após o layout assentar)
// =============================
(function () {
  const navEl = document.getElementById('mainNav');

  function scrollToHash(hash, smooth) {
    const target = document.querySelector(hash);
    if (!target) return false;
    const navH = navEl ? navEl.offsetHeight : 0;
    const y = target.getBoundingClientRect().top + window.pageYOffset - navH + 1;
    window.scrollTo({ top: y, behavior: smooth ? 'smooth' : 'auto' });
    return true;
  }

  // Ao chegar de outra página com #hash: posiciona depois que GSAP/imagens assentam.
  if (window.location.hash && window.location.hash.length > 1) {
    const hash = window.location.hash;
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.addEventListener('load', () => {
      requestAnimationFrame(() => setTimeout(() => {
        if (window.ScrollTrigger) ScrollTrigger.refresh();
        scrollToHash(hash, false);
      }, 250));
    });
  }

  // Cliques em links de âncora na mesma página: smooth com offset do nav.
  document.querySelectorAll('a[href*="#"]').forEach(a => {
    a.addEventListener('click', e => {
      let url;
      try { url = new URL(a.href, window.location.href); } catch (_) { return; }
      const samePage = url.host === window.location.host && url.pathname === window.location.pathname;
      if (samePage && url.hash.length > 1 && document.querySelector(url.hash)) {
        e.preventDefault();
        scrollToHash(url.hash, true);
        history.pushState(null, '', url.hash);
      }
    });
  });
})();
