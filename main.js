'use strict';

const header = document.querySelector('#header');
const homeContainer = document.querySelector('#homeContainer');

const fixHeader = () => {
  const scrollY = window.scrollY;
  const headerHeight = header.getBoundingClientRect().height;

  if (scrollY > headerHeight) {
    header.classList.add('fixed');
  } else {
    header.classList.remove('fixed');
  }
};

const scrollOpacity = () => {
  const scrollY = window.scrollY;
  const homeContainerHeight = homeContainer.getBoundingClientRect().height;
  const opacity = 1 - scrollY / homeContainerHeight;
  // = (homeContainerHeight - scrollY) / homeContainerHeight

  homeContainer.style.opacity = opacity;
};

document.addEventListener('scroll', fixHeader);
document.addEventListener('scroll', scrollOpacity);
