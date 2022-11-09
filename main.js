'use strict';

const header = document.querySelector('#header');
const homeContainer = document.querySelector('#homeContainer');
const about = document.querySelector('#about');
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
  const homeContainerBottom = homeContainer.getBoundingClientRect().bottom;
  const aboutHeight = about.getBoundingClientRect().height;
  opacity = scrollY / aboutHeight;

  arrowUpBtn.style.opacity = opacity;

  if (scrollY > homeContainerHeight / 2) {
    arrowUpBtn.classList.add('visible');
  } else {
    arrowUpBtn.classList.remove('visible');
  }
};

document.addEventListener('scroll', handleScroll);
