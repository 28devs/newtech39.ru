if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}
//
// Center alignment for submenus
// Add class to menu item with submenu


var submenus = document.querySelectorAll('.header .nav ul');

submenus.forEach(function (elem) {
  elem.parentNode.classList.add('nav-child');
});

var submenusAligment = function () {
  submenus.forEach(function (elem) {
    elem.style.left = -Math.abs((elem.offsetWidth - elem.parentNode.offsetWidth) / 2) + 'px';
  });
};
submenusAligment();
window.onresize = submenusAligment;

//
// Hero slider initialization
//

var heroSlider = $('.hero__slider #hero-slider').lightSlider({
  item: 1,
  controls: false,
  onSliderLoad: function () {
    document.querySelector('.lSPager').classList.add('container');
    document.querySelector('.hero').classList.add('hero--slider-load');
  },
  onBeforeNextSlide: function () {
    document.querySelector('.hero').classList.add('hero--slider-slide');
  },
  onAfterSlide: function () {
    document.querySelector('.hero').classList.remove('hero--slider-slide');
  }
});

//
// Landing hero slider initialization
//

var landingSlider = $('.hero__slider #landing-slider').lightSlider({
  item: 1,
  controls: false,
  enableDrag: false,
  pager: false,
  enableTouch: false,
  onSliderLoad: function () {
    document.querySelector('.hero').classList.add('hero--slider-load');
  }
});

var landingSliderTop = $('.hero__slider #landing-slider-top').lightSlider({
  item: 1,
  controls: false,
  enableDrag: false,
  pager: false,
  enableTouch: false,
  onSliderLoad: function () {
    document.querySelector('.hero-top').classList.add('hero--slider-load');
  }
});

//
// Landing tariffs slider initialization
//

// var tariffsSlider = $('.tariffs-block__slider').lightSlider({
//   item: 3,
//   slideMargin: 0,
//   controls: false,
//   pager: false,
//   enableTouch: false,
//   onSliderLoad: function() {
//     document.querySelector('.lSPager').classList.add('container');
//     document.querySelector('.hero').classList.add('hero--slider-load');
//   },
//   onBeforeNextSlide: function() {
//     document.querySelector('.hero').classList.add('hero--slider-slide');
//   },
//   onAfterSlide: function() {
//     document.querySelector('.hero').classList.remove('hero--slider-slide');
//   }
// });

//
// Menu slider for photo-gallary
//

var menuSlider = $('#slider-menu').lightSlider({
  item: 5,
  slideMove: 5,
  controls: false,
  pager: false,
  responsive: [{
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
var prevSlide = $('#prev').on('click', function () {
  menuSlider.goToPrevSlide();
});
var nextSlide = $('#next').on('click', function () {
  menuSlider.goToNextSlide();
});

//
// Main page gallery initialization
//

var lightGalleryMain = $('#gallery-main').lightGallery({
  selector: '.gallery__item a',
  downloadUrl: false
});

//
//video gallery reviews
//

var videoGalleryReviews = $('#video-reviews').lightGallery({
  selector: '.video-reviews__item',
  pager: false,
  controls: false,
  thumbnail: false
});

//
// landing gallery whith one video
//
var videoPresentation = $('#video-presentation').lightGallery({
  selector: '.presentation__item',
  pager: false,
  controls: false,
  thumbnail: false
});

//
// Footer nav tabs (work on small resolution)
//

var footerNavBtns = document.querySelectorAll('.footer__nav-item a');
var footerNavs = document.querySelectorAll('.footer__nav-childs');

var showFooterNav = function () {
  var index = this.getAttribute('href').slice(1);

  footerNavBtns.forEach(function (elem) {
    elem.classList.remove('active');
  });

  this.classList.add('active');

  footerNavs.forEach(function (elem) {
    elem.classList.remove('active');
  });

  footerNavs[index].classList.add('active');
};

footerNavBtns.forEach(function (elem) {
  elem.addEventListener('click', showFooterNav);
});

//
// Forms testing handler
//

var forms = document.querySelectorAll('form');

forms.forEach(function (elem) {
  elem.addEventListener('submit', function (e) {
    e.preventDefault();
    this.parentNode.parentNode.classList.add('form-success--show');
  });
});

//
// Landing animate (in tags) and input phone mask
//

new WOW().init();

//$('.input-phone').inputmask('99-9999999');
Inputmask({
  mask: '+7 (999) 999-99-99'
}).mask(
  document.querySelectorAll('.input-phone')
);
console.log(Inputmask);

//
// Minify header when page scroll
//

var header = document.querySelector('.header');

var headerScroll = function () {
  this.scrollY < 30 ?
    header.classList.remove('header--scroll-state') :
    header.classList.add('header--scroll-state');
};
headerScroll();
window.onscroll = headerScroll;

//
// Header nav mobile
//

var headerNav = document.querySelector('.header__nav .nav');
var headerNavBtnOpen = document.querySelector('.header__nav-open');
var headerNavBtnClose = document.querySelector('.header__nav-close');
var headerNavBtnPrev = document.querySelector('.header__nav-prev');
var headerNavBtnPrevOriginalText = headerNavBtnPrev.textContent;

headerNavBtnOpen.addEventListener('click', function () {
  headerNav.classList.add('header__nav--open');
});

headerNavBtnClose.addEventListener('click', function () {
  headerNav.classList.remove('header__nav--open');
});

// Change prev button text to current nav category
var headerNavsWithChilds = document.querySelectorAll(
  '.header__nav .nav-child'
);

var changePrevBtnText = function () {
  var categoryName = this.childNodes[0].textContent;

  headerNavBtnPrev.textContent = categoryName;
  headerNavBtnPrev.classList.add('header__nav-prev--arrow');

  this.classList.add('header__nav--child-open');
};

headerNavsWithChilds.forEach(function (elem) {
  elem.addEventListener('click', changePrevBtnText);
});

// Return original text to prev button than close submenu
var returnPrevBtnText = function () {
  this.textContent = headerNavBtnPrevOriginalText;
  this.classList.remove('header__nav-prev--arrow');

  document
    .querySelector('.header__nav--child-open')
    .classList.remove('header__nav--child-open');
};

headerNavBtnPrev.addEventListener('click', returnPrevBtnText);
