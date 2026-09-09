const paths = {
  home: '<path d="M3 11 12 3l9 8"/><path d="M5 10v11h14V10M9 21v-7h6v7"/>',
  discover: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  platforms: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 5V3h8v2M8 10h8M8 14h5"/>',
  opportunity: '<path d="M4 18h16M6 15l4-4 3 2 5-7"/><path d="M15 6h3v3"/>',
  resources: '<path d="M5 4h14v16H5z"/><path d="M8 8h8M8 12h8M8 16h5"/>',
  support: '<circle cx="12" cy="12" r="9"/><path d="M9.6 9a2.6 2.6 0 1 1 4.2 2c-1 .7-1.8 1.2-1.8 2.5M12 17h.01"/>',
  account: '<circle cx="12" cy="8" r="4"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/>',
  fuel: '<path d="M6 21V4h9v17M4 21h13M8 8h5v4H8z"/><path d="M15 8h2l2 2v7a2 2 0 0 0 2 2"/>',
  microFuel: '<path d="M5 20V8l7-4 7 4v12M3 20h18"/><path d="M9 20v-6h6v6M9 10h6"/>',
  restaurant: '<path d="M7 3v8M4 3v5a3 3 0 0 0 6 0V3M7 11v10M15 3v18M15 3c4 2 4 8 0 10"/>',
  store: '<path d="M4 9h16l-2-5H6zM5 9v11h14V9"/><path d="M9 20v-6h6v6"/>',
  tire: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 4v5M20 12h-5M12 20v-5M4 12h5"/>',
  court: '<circle cx="8" cy="8" r="4"/><path d="m11 11 9 9M15 15l2-2"/>',
  truck: '<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',
  bakery: '<path d="M5 13c0-4 3-7 7-7s7 3 7 7v6H5z"/><path d="M8 10c1 1 1 2 0 3M12 8c1 1 1 2 0 3M16 10c1 1 1 2 0 3"/>',
  car: '<path d="m5 11 2-5h10l2 5"/><path d="M3 11h18v7H3z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
  branch: '<path d="M12 3v7M6 21v-5h12v5M6 16v-3h12v3M12 10v3"/><circle cx="12" cy="3" r="1"/>',
  shield: '<path d="m12 3 8 3v5c0 5-3.4 8.3-8 10-4.6-1.7-8-5-8-10V6z"/><path d="m8.5 12 2.3 2.3 4.8-5"/>',
  billing: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',
  arrow: '<path d="M5 12h14M14 7l5 5-5 5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
};

export function icon(name, className = "") {
  return `<svg class="ui-icon ${className}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths[name] ?? paths.arrow}</svg>`;
}
