//
// Minify header when page scroll
//

const header = document.querySelector('.header');

const headerScroll = function() {
  this.scrollY < 30
    ? header.classList.remove('header--scroll-state')
    : header.classList.add('header--scroll-state');
};
headerScroll();
window.onscroll = headerScroll;

//
// Center alignment for submenus
// Add class to menu item with submenu
//

const submenus = document.querySelectorAll('.header .nav ul');

submenus.forEach(function(elem) {
  elem.parentNode.classList.add('nav-child');
});

const submenusAligment = function() {
  submenus.forEach(function(elem) {
    elem.style.left =
      -Math.abs((elem.offsetWidth - elem.parentNode.offsetWidth) / 2) + 'px';
  });
};
submenusAligment();
window.onresize = submenusAligment;

//
// Hero slider initialization
//

const heroSlider = $('.hero__slider ul').lightSlider({
  item: 1,
  controls: false,
  onSliderLoad: function() {
    document.querySelector('.lSPager').classList.add('container');
    document.querySelector('.hero').classList.add('hero--slider-load');
  },
  onBeforeNextSlide: function() {
    document.querySelector('.hero').classList.add('hero--slider-slide');
  },
  onAfterSlide: function() {
    document.querySelector('.hero').classList.remove('hero--slider-slide');
  }
});

//
// Menu slider for photo-gallary
//

const menuSlider = $('#slider-menu').lightSlider({
  item: 5,
  slideMove: 5,
  controls: false,
  pager: false,
  responsive: [
    {
      breakpoint: 1220,
      settings: {
        item: 4,
        slideMove: 4
      }
    },
    {
      breakpoint: 668,
      settings: {
        item: 3,
        slideMove: 3
      }
    }
  ]
});
const prevSlide = $('#prev').on('click', function() {
  menuSlider.goToPrevSlide();
});
const nextSlide = $('#next').on('click', function() {
  menuSlider.goToNextSlide();
});

//
// Main page gallery initialization
//

const lightGalleryMain = $('#gallery-main').lightGallery({
  selector: '.gallery__item a',
  downloadUrl: false
});

//
// Header nav mobile
//

//
//video gallery reviews
//

const videoGalleryReviews = $('#video-reviews').lightGallery({
  selector: '.video-reviews__item',
  pager: false,
  controls: false,
  thumbnail: false
})

const headerNav = document.querySelector('.header__nav .nav');
const headerNavBtnOpen = document.querySelector('.header__nav-open');
const headerNavBtnClose = document.querySelector('.header__nav-close');
const headerNavBtnPrev = document.querySelector('.header__nav-prev');
const headerNavBtnPrevOriginalText = headerNavBtnPrev.textContent;

headerNavBtnOpen.addEventListener('click', function() {
  headerNav.classList.add('header__nav--open');
});

headerNavBtnClose.addEventListener('click', function() {
  headerNav.classList.remove('header__nav--open');
});

// Change prev button text to current nav category
const headerNavsWithChilds = document.querySelectorAll(
  '.header__nav .nav-child'
);

const changePrevBtnText = function() {
  let categoryName = this.childNodes[0].textContent;

  headerNavBtnPrev.textContent = categoryName;
  headerNavBtnPrev.classList.add('header__nav-prev--arrow');

  this.classList.add('header__nav--child-open');
};

headerNavsWithChilds.forEach(function(elem) {
  elem.addEventListener('click', changePrevBtnText);
});

// Return original text to prev button than close submenu
const returnPrevBtnText = function() {
  this.textContent = headerNavBtnPrevOriginalText;
  this.classList.remove('header__nav-prev--arrow');

  document
    .querySelector('.header__nav--child-open')
    .classList.remove('header__nav--child-open');
};

headerNavBtnPrev.addEventListener('click', returnPrevBtnText);

//
// Footer nav tabs (work on small resolution)
//

const footerNavBtns = document.querySelectorAll('.footer__nav-item a');
const footerNavs = document.querySelectorAll('.footer__nav-childs');

const showFooterNav = function() {
  let index = this.getAttribute('href').slice(1);

  footerNavBtns.forEach(function(elem) {
    elem.classList.remove('active');
  });

  this.classList.add('active');

  footerNavs.forEach(function(elem) {
    elem.classList.remove('active');
  });

  footerNavs[index].classList.add('active');
};

footerNavBtns.forEach(function(elem) {
  elem.addEventListener('click', showFooterNav);
});

//
// Forms testing handler
//

const forms = document.querySelectorAll('form');

forms.forEach(function(elem) {
  elem.addEventListener('submit', function(e) {
    e.preventDefault();
    this.parentNode.parentNode.classList.add('form-success--show');
  });
});
