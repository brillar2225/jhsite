'use strict';

const header = document.querySelector('#header');
const homeContainer = document.querySelector('#homeContainer');
const arrowUpBtn = document.querySelector('#arrowUpBtn');
const categoryBtns = document.querySelector('#categoryBtnContainer');
const projects = document.querySelector('#projectContainer');
const project = document.querySelectorAll('.project');

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

const handleWorkFilter = (event) => {
  const filter =
    event.target.dataset.filter || event.target.parentNode.dataset.filter;

  if (filter === null || undefined) {
    return;
  }

  projects.classList.add('animation-out');
  setTimeout(() => {
    project.forEach((i) => {
      if (filter === '*' || filter === i.dataset.type) {
        i.classList.remove('invisible');
      } else {
        i.classList.add('invisible');
      }
    });
    projects.classList.remove('animation-out');
  }, 300);
};

document.addEventListener('scroll', handleScroll);
categoryBtns.addEventListener('click', handleWorkFilter);
