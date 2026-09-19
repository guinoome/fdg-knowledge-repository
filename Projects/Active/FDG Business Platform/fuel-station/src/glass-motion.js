// Presentation only: native modal focus/inert behavior is retained during exit.
export function glassDialog(dialog, environment = window) {
  let closing = false;
  let opener;
  const reduced = () => environment.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const animate = async (frames, duration) => {
    if (reduced() || !dialog.animate) return;
    const animation = dialog.animate(frames, { duration, easing: 'cubic-bezier(.2,.8,.2,1)' });
    try { await animation.finished; } catch { /* Detached/cancelled animation must not trap a modal. */ }
  };
  const close = async (after) => {
    if (closing || !dialog.open) return;
    closing = true;
    await animate([{ opacity: 1, translate: '0 0' }, { opacity: 0, translate: '0 28px' }], 180);
    dialog.close();
    closing = false;
    if (opener?.isConnected) opener.focus({ preventScroll: true });
    after?.();
  };
  dialog.addEventListener('cancel', event => { event.preventDefault(); void close(); });
  dialog.addEventListener('click', event => { if (event.target === dialog) void close(); });
  return {
    open(trigger) {
      opener = trigger;
      dialog.showModal();
      void animate([{ opacity: 0, translate: '0 36px' }, { opacity: 1, translate: '0 0' }], 320);
    },
    close,
  };
}
