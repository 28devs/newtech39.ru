// Minify header when page scroll
const header = document.querySelector('.header');

const headerScroll = function() {
  this.scrollY < 30
    ? header.classList.remove('header--scroll-state')
    : header.classList.add('header--scroll-state');
};
headerScroll();

window.onscroll = headerScroll;

// Center alignment for submenus
// Add class to menu item with submenu
const submenus = document.querySelectorAll('.header .nav ul');

submenus.forEach(function(elem) {
  elem.parentNode.classList.add('nav-child');

  elem.style.left =
    -Math.abs((elem.offsetWidth - elem.parentNode.offsetWidth) / 2) + 'px';
});

// Hero slider initialization
const heroSlider = $('.hero__slider ul').lightSlider({
  item: 1,
  controls: false,
  onSliderLoad: function() {
    document.querySelector('.lSPager').classList.add('container');
    document.querySelector('.hero').classList.add('hero--slider-load');
  }
});

// main page gallery initializatio
const lightGalleryMain = $('#gallery-main').lightGallery({
  selector: '.gallery__item a',
  downloadUrl: false
});
