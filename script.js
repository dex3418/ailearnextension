const revealItems = document.querySelectorAll('.reveal-up');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const delay = Number(entry.target.dataset.delay || 0);
      setTimeout(() => entry.target.classList.add('is-visible'), delay);
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item) => observer.observe(item));

const counters = document.querySelectorAll('[data-counter]');
let animated = false;

function animateCounters() {
  if (animated) return;
  animated = true;

  counters.forEach((counter) => {
    const target = Number(counter.dataset.counter);
    const hasDecimal = String(counter.dataset.counter).includes('.');
    const duration = 1200;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;

      counter.textContent = hasDecimal ? value.toFixed(1) : Math.round(value);

      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  });
}

const heroMock = document.querySelector('.hero-mockup');
if (heroMock) {
  const heroObs = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        animateCounters();
        heroObs.disconnect();
      }
    },
    { threshold: 0.45 }
  );

  heroObs.observe(heroMock);
}
