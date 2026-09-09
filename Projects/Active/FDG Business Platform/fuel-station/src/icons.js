const paths = {
  experience: '<path d="M4 18.5 12 4l8 14.5"/><path d="M7.5 13h9"/>',
  overview: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9 21v-7h6v7"/>',
  closeout: '<path d="M5 3h14v18H5z"/><path d="m8 12 2.5 2.5L16 9"/><path d="M8 6.5h8"/>',
  tanks: '<path d="M7 3h10v18H7z"/><path d="M7 8h10M7 16h10"/><path d="M10 5.5h4"/>',
  deliveries: '<path d="M3 6h11v10H3z"/><path d="M14 9h4l3 3v4h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',
  pricing: '<path d="M12 3v18M16.5 7H9.8a3.3 3.3 0 0 0 0 6.6h4.4a3.3 3.3 0 0 1 0 6.4H7"/>',
  reports: '<path d="M5 3h14v18H5z"/><path d="M8 16v-3M12 16V8M16 16v-6"/>',
  audit: '<path d="m12 3 8 3v5c0 5.2-3.4 8.4-8 10-4.6-1.6-8-4.8-8-10V6z"/><path d="m8.5 12 2.2 2.2 4.8-5"/>',
  arrow: '<path d="M5 12h14M14 7l5 5-5 5"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  signal: '<path d="M5 19a10 10 0 0 1 14 0M8 16a6 6 0 0 1 8 0M11 13a2 2 0 0 1 2 0"/>',
};

export function icon(name, className = "") {
  const path = paths[name] ?? paths.arrow;
  return `<svg class="ui-icon ${className}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;
}
