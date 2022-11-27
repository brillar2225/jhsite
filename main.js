'use strict';

// Variables
const header = document.querySelector('#header');
const navbar = document.querySelector('#navbar');
const menubarBtn = document.querySelector('#menubarBtn');
const listAll = document.querySelectorAll('.header__li');
const sectionAll = document.querySelectorAll('section');
const homeContainer = document.querySelector('#homeContainer');
const categories = document.querySelector('#categoryContainer');

let opacity;

// Activate navigation button when scrolling
const sections = Array.from(sectionAll);
const listArray = Array.from(listAll);
const sectionId = sections.map((i) => i.id);

let selectedListIndex = 0;
let selectedList = listArray[0];

const activateBtn = (selected) => {
  selectedList.classList.remove('active');
  selectedList = selected;
  selectedList.classList.add('active');
};

const options = {
  root: null, //viewport
  rootMargin: '0px',
  threshold: 0.45,
};

const callback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionId.indexOf(entry.target.id);

      if (entry.boundingClientRect.y < 0) {
        selectedListIndex = index + 1;
      } else {
        selectedListIndex = index - 1;
      }
    }
  });
};

const observer = new IntersectionObserver(callback, options);
sections.forEach((section) => observer.observe(section));

// Handle menubar button on mobile screen
const handleMenu = () => {
  header.classList.toggle('active');
  navbar.classList.toggle('active');
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
  const arrowUpBtn = document.querySelector('#arrowUpBtn');
  opacity = scrollY / homeContainerHeight;

  if (scrollY > homeContainerHeight / 2) {
    arrowUpBtn.classList.add('visible');
  } else {
    arrowUpBtn.classList.remove('visible');
  }
  arrowUpBtn.style.opacity = opacity;
};

const handleWorks = (event) => {
  // Activate button status when it is clicked
  const target = event.target;
  const activedBtn = document.querySelector('.category__btn.active');
  const activedCount = document.querySelector('.category__count.active');

  let parentTarget;
  let childTarget;

  switch (target.nodeName) {
    case 'BUTTON':
      parentTarget = target;
      childTarget = target.querySelector('.category__count');

      if (activedBtn && activedCount) {
        activedBtn.classList.remove('active');
        activedCount.classList.remove('active');
      }
      parentTarget.classList.add('active');
      childTarget.classList.add('active');
      break;

    case 'SPAN':
      parentTarget = target.parentNode;
      childTarget = target;

      if (activedBtn && activedCount) {
        activedBtn.classList.remove('active');
        activedCount.classList.remove('active');
      }
      parentTarget.classList.add('active');
      childTarget.classList.add('active');
      break;

    default:
      break;
  }

  // Filter projects in given condition
  const projects = document.querySelector('#projectContainer');
  const project = document.querySelectorAll('.project');
  const filter =
    event.target.dataset.filter || event.target.parentNode.dataset.filter;

  if (filter === undefined) {
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
window.addEventListener('scroll', () => {
  if (
    Math.round(window.scrollY + window.innerHeight) >=
    document.body.scrollHeight
  ) {
    selectedListIndex = listArray.length - 1;
  }
  activateBtn(listArray[selectedListIndex]);
});
document.addEventListener('scroll', handleScroll);
menubarBtn.addEventListener('click', handleMenu);
categories.addEventListener('click', handleWorks);
