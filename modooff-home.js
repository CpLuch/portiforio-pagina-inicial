// Fallback mínimo do menu móvel se o Bootstrap JavaScript não carregar.
(() => {
  const trigger = document.querySelector('.pagina-offhub .navbar-toggler');
  const panel = document.querySelector('.pagina-offhub #menuPrincipal');
  if (!trigger || !panel) return;
  trigger.addEventListener('click', () => {
    // Quando Bootstrap está presente, o próprio framework cuida do menu.
    if (window.bootstrap && window.bootstrap.Collapse) return;
    const expanded = trigger.getAttribute('aria-expanded') === 'true';
    trigger.setAttribute('aria-expanded', String(!expanded));
    panel.classList.toggle('show', !expanded);
  });
})();