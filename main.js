'use strict';

// Variables
const header = document.querySelector('#header');
const navbar = document.querySelector('#navbar');
const menubarBtn = document.querySelector('#menubarBtn');
const lists = document.querySelectorAll('.header__li');
const sections = document.querySelectorAll('section');
const homeContainer = document.querySelector('#homeContainer');
const categories = document.querySelector('#categoryContainer');

let opacity;

// Global Func
const activateList = (li) => {
  lists.forEach((list) => {
    list.classList.remove('active');
  });
  li.classList.add('active');
};

// Handle menubar button on mobile screen
const handleMenu = () => {
  header.classList.toggle('active');
  navbar.classList.toggle('active');
};

// Scroll Events on header, home, and arrow up button
const handleScroll = () => {
  const scrollY = window.scrollY;

  // Active navbar with scroll event
  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    // condition : top and bottom of each section
    if (scrollY >= top - 200 && scrollY < height + top) {
      const target = document.querySelector(`[href='#${id}']`).parentElement;
      activateList(target);
    }
  });

  // condition for the active contact button
  if (window.innerHeight + scrollY >= document.body.scrollHeight) {
    const contactList = document.querySelector(
      '.header__li [href="#contact"]'
    ).parentElement;
    activateList(contactList);
  }

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
document.addEventListener('scroll', handleScroll);
menubarBtn.addEventListener('click', handleMenu);
lists.forEach((list) => {
  list.addEventListener('click', function () {
    activateList(this);
  });
});
categories.addEventListener('click', handleWorks);
