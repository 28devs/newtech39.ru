const header = document.querySelector('.header');

window.onscroll = function() {
  this.oldScroll > this.scrollY
    ? header.classList.remove('header--hide')
    : header.classList.add('header--hide');

  this.scrollY < header.offsetHeight
    ? header.classList.remove('header--scroll-state')
    : header.classList.add('header--scroll-state');

  this.oldScroll = this.scrollY;
};
