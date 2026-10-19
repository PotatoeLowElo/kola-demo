const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
const navLinks = [...navigation.querySelectorAll('a[href^="#"]')];

menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Zapri navigacijo' : 'Odpri navigacijo');
});

function setActive(id) {
  navLinks.forEach(link => {
    const active = link.getAttribute('href') === `#${id}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    const id = link.getAttribute('href').slice(1);
    setActive(id);
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Odpri navigacijo');
  });
});

const sections = navLinks.map(link => document.getElementById(link.hash.slice(1))).filter(Boolean);
let scrollScheduled = false;
function updateActiveOnScroll() {
  const position = window.scrollY + 160;
  let active = sections[0]?.id;
  for (const section of sections) {
    if (section.offsetTop <= position) active = section.id;
  }
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) {
    active = sections[sections.length - 1]?.id;
  }
  if (active) setActive(active);
  scrollScheduled = false;
}
window.addEventListener('scroll', () => {
  if (!scrollScheduled) {
    scrollScheduled = true;
    requestAnimationFrame(updateActiveOnScroll);
  }
}, {passive: true});
window.addEventListener('load', updateActiveOnScroll);
