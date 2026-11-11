(() => {
  const triggers = [...document.querySelectorAll('.note-trigger')];
  let current = null;
  function closeCurrent() {
    if (!current) return;
    current.button.setAttribute('aria-expanded', 'false');
    current.popup.hidden = true;
    current = null;
  }
  function open(button) {
    const wrap = button.closest('.note-anchor');
    const popup = wrap && wrap.querySelector('.note-popup');
    if (!popup) return;
    if (current && current.button === button) { closeCurrent(); return; }
    closeCurrent();
    popup.hidden = false;
    button.setAttribute('aria-expanded', 'true');
    current = {button, popup};
    // On desktop, keep the popover within the viewport when the reference is near the right edge.
    if (window.matchMedia('(min-width: 701px)').matches) {
      popup.style.left = '0'; popup.style.right = 'auto';
      const rect = popup.getBoundingClientRect();
      if (rect.right > window.innerWidth - 12) { popup.style.left = 'auto'; popup.style.right = '0'; }
    }
  }
  triggers.forEach(button => button.addEventListener('click', event => {
    event.stopPropagation(); open(button);
  }));
  document.addEventListener('click', event => {
    if (current && !current.popup.contains(event.target) && !current.button.contains(event.target)) closeCurrent();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && current) { const b = current.button; closeCurrent(); b.focus(); }
  });
  window.addEventListener('resize', closeCurrent);
})();
