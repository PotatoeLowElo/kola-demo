const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
const navLinks = [...navigation.querySelectorAll('a[href^="#"]')];
function closeMenu() {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Odpri navigacijo');
}
menuButton.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Zapri navigacijo' : 'Odpri navigacijo');
});
navLinks.forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    closeMenu(); menuButton.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});
window.matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);
const sections = navLinks.map(link => document.getElementById(link.hash.slice(1))).filter(Boolean);
let scrollScheduled = false;
function updateActive() {
  let active = sections[0]?.id;
  const position = window.scrollY + 150;
  for (const section of sections) if (section.offsetTop <= position) active = section.id;
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) active = sections.at(-1)?.id;
  navLinks.forEach(link => {
    const current = link.hash === `#${active}`;
    link.classList.toggle('active', current);
    if (current) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  scrollScheduled = false;
}
window.addEventListener('scroll', () => {
  if (!scrollScheduled) { scrollScheduled = true; requestAnimationFrame(updateActive); }
}, { passive: true });
window.addEventListener('load', updateActive);
window.addEventListener('resize', updateActive);
