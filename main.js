'use strict';

const header = document.querySelector('#header');
const homeContainer = document.querySelector('#homeContainer');
const arrowUpBtn = document.querySelector('#arrowUpBtn');

const handleScroll = () => {
  const scrollY = window.scrollY;

  let opacity;

  // Header Scroll Event
  const headerHeight = header.getBoundingClientRect().height;

  if (scrollY > headerHeight) {
    header.classList.add('fixed');
  } else {
    header.classList.remove('fixed');
  }

  // Home Scroll Event
  const homeContainerHeight = homeContainer.getBoundingClientRect().height;
  opacity = 1 - scrollY / homeContainerHeight; // = (homeContainerHeight - scrollY) / homeContainerHeight

  homeContainer.style.opacity = opacity;

  // Arrow Up Event
  opacity = scrollY / homeContainerHeight;

  if (scrollY > homeContainerHeight / 2) {
    arrowUpBtn.classList.add('visible');
  } else {
    arrowUpBtn.classList.remove('visible');
  }

  arrowUpBtn.style.opacity = opacity;
};

document.addEventListener('scroll', handleScroll);
