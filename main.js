'use strict';

// Variables
const header = document.querySelector('#header');
const navbar = document.querySelector('#navbar');
const homeContainer = document.querySelector('#homeContainer');
const arrowUpBtn = document.querySelector('#arrowUpBtn');
const categories = document.querySelector('#categoryContainer');
const projects = document.querySelector('#projectContainer');
const project = document.querySelectorAll('.project');

let opacity;
let preTarget = null;
let preButton = null;
let preChildButton = null;

// Global Func
const activateStatus = (event) => {
  const target = event.target;

  switch (target.nodeName) {
    case 'A':
      target.classList.add('active');

      if (preTarget !== null) {
        preTarget.classList.remove('active');
      }

      preTarget = target;
      break;

    case 'BUTTON':
      const targetChild = event.target.querySelector('.category__count');

      target.classList.add('active');
      targetChild.classList.add('active');

      if (preButton !== null) {
        preButton.classList.remove('active');
        preChildButton.classList.remove('active');
      }

      preButton = target;
      preChildButton = targetChild;
      break;

    case 'SPAN':
      const targetParent = event.target.parentNode;

      targetParent.classList.add('active');
      target.classList.add('active');

      if (preButton !== null) {
        preButton.classList.remove('active');
        preChildButton.classList.remove('active');
      }

      preButton = target;
      preChildButton = targetParent;
      break;

    default:
      break;
  }
};

// Scroll Events on header, home, and arrow up button
const handleScroll = () => {
  const scrollY = window.scrollY;

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

// Activate status of button and filter projects in given condition
const handleWorks = (event) => {
  activateStatus(event);

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

// EventListeners
document.addEventListener('scroll', handleScroll);
navbar.addEventListener('click', activateStatus);
categories.addEventListener('click', handleWorks);
