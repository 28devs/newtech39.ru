// Minify header when page scroll
const header = document.querySelector('.header');

const headerScroll = function() {
  this.scrollY < header.offsetHeight
    ? header.classList.remove('header--scroll-state')
    : header.classList.add('header--scroll-state');
};
headerScroll();

window.onscroll = headerScroll;

// Center alignment for submenus
// Add class for menu with submenu
const submenus = document.querySelectorAll('.header .nav ul');

submenus.forEach(function(elem) {
  elem.parentNode.classList.add('nav-child');

  elem.style.left =
    -Math.abs((elem.offsetWidth - elem.parentNode.offsetWidth) / 2) + 'px';
});
