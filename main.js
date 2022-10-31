'use strict';

const header = document.querySelector('#header');

const fixHeader = () => {
  const scrollY = window.scrollY;
  const headerHeight = header.getBoundingClientRect().height;

  if (scrollY > headerHeight) {
    header.classList.add('fixed');
  } else {
    header.classList.remove('fixed');
  }
};

document.addEventListener('scroll', fixHeader);
