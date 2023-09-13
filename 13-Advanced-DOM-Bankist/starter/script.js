'use strict';

///////////////////////////////////
// Selectors
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const navLink = document.querySelectorAll('.nav__link');
const navLinks = document.querySelector('.nav__links');
const operationBtns = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

///////////////////////////////////////
// Modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////////////////////////////////////////////////////////
// Page navigation
// Smooth scrolling
btnScrollTo.addEventListener('click', function (e) {
  // const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);
  // console.log('current scroll (X/Y)', pageXOffset, pageYOffset);

  // // Checking viewport lenghts
  // console.log(
  //   'height/width viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  //Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo(
  //   s1coords.left + window.scrollX,
  //   s1coords.top + window.scrollY
  // );

  // Implementing smooth scrolling
  // window.scrollTo({
  //   left: s1coords.left + window.scrollX,
  //   top: s1coords.top + window.scrollY,
  //   behavior: 'smooth',
  // });

  // Implementing smooth scroll behavior in a more modern way
  section1.scrollIntoView({ behavior: 'smooth' });
});

// navLink.forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     let section = document.querySelector(id);
//     section.scrollIntoView({ behavior: 'smooth' });
//   });
// });

// Same as above but doing it with event delegation. This way its not neccesary to create the same event listener for every link. Its only necessary making one in the common parent element and defining the targeted click by the e.target property (where the event originated).
console.log(navLinks);
navLinks.addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    // console.log(e.target);
    const id = e.target.getAttribute('href');
    let section = document.querySelector(id);
    // console.log(section);
    section.scrollIntoView({ behavior: 'smooth' });
  }
});

/*
// Tabbed component (My take before watcing the lecture)
console.log(operationBtns);
operationBtns.addEventListener('click', function (e) {
  e.preventDefault();

  console.log(operationBtns.children);

  // Making that only the tabs moves (if not checked, the span and the div itself moves)
  if (e.target.classList.contains('operations__tab')) {
    // If the target doesnt already have the active class, it gets activated
    if (!e.target.classList.contains('operations__tab--active')) {
      console.log(e.target);
      // Getting the tab id in order to later match the content to the tab
      const tabId = e.target.dataset.tab;
      console.log(tabId);

      // Removing the active class from all the children of the operationBtns (removing from all the tabs)
      [...operationBtns.children].forEach(btn => {
        btn.classList.remove('operations__tab--active');
      });
      console.log(operationBtns.children);

      // Adding the active class to the selected operation tab (the one thats being clicked)
      e.target.classList.add('operations__tab--active');

      // This is commented because the same (But better) its being done on line 117 where i removed the active class from all the tabs.

      // e.target.previousElementSibling?.classList.remove(
      //   'operations__tab--active'
      // );
      // e.target.nextElementSibling?.classList.remove('operations__tab--active');

      // Removing the active classes from the content elements
      [...operationBtns.parentElement.children].forEach(el => {
        if (el.classList.contains('operations__content')) {
          el.classList.remove('operations__content--active');
        }
      });

      let content = document.querySelector(`.operations__content--${tabId}`);
      // Adding the active class to the content element that its being targeted according to the tabId from the selected operation__tab btn
      content.classList.add('operations__content--active');
      console.log(operationBtns.parentElement.children);
    }
  }
});
*/

// Tabbed component by proffesor:
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  // Guard clause
  if (!clicked) return;

  // Remove active classes for tab and content
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade animation
// The handler functions can only take one argument as parameter.
// To have another parameter in the function we use the bind method and set the 'this' keyword to wathever value we need for the function
const handleHover = function (e) {
  // console.log(this);
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Here we are setting the this keyword to the value for the opacity needed in the handleHover function.
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

//////////////////////////////////////////////////////////////////////
// LECTURES
/*
// Selecting the entire document, the head and the body
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// Selecting by class or ID
const header = document.querySelector('.header');
// QuerySelectorAll creates a nodelist if more than one element is found. It is possible to use forEach method on nodelists
const allSections = document.querySelectorAll('.section');
console.log(allSections);

// Getting element by ID (selecting without the selector, there's no need to wirte, in this case, #section--1)
document.getElementById('section--1');
// Getting elements by its HTML tag -- returns an HTMLCollection (it updates inmediately if the DOM changes)
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);
// Getting element by className. Same as the ID selector, its not necessary to use the CSS selector as an argument. Simply the name of the class. It also return an HTMLCollection and not a NodeList!
console.log(document.getElementsByClassName('btn'));

// Creating and inserting elements
// .insertAdjacentHTML

// Creating a cookie message programaticly and inserting it to the DOM
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent =
//   'We use cookies for imporoved functionality and analytics.';
// Creating the HTML for the cookie message object
message.innerHTML =
  'We use cookies for imporoved functionality and analytics. <button class="btn btn--close--cookie">Got it!<button>';

// the Prepend method adds the element as the first child of the selected element. In this case, as the first child of the header
header.prepend(message);
// the append method adds its as the last child of the selected element
header.append(message);
// One element can only be in one side of the DOM at a time. To append multiple copies of the element into the DOM we have to indeed, copy it.
// To copy an element we use cloneNode(true)
// header.prepend(message.cloneNode(true));
// After this line we have a copy of the message prepended and it looks like the same element its in both places, but in reallity its a copy.

// The before method will insert the element before the selected object (in this case, the message element will be added before the header even starts)
// header.before(message.cloneNode(true))
// The after method will to the ssame as before() but after the selected element
// header.after(message.cloneNode(true));

// Deleting elements
document
  .querySelector('.btn--close--cookie')
  .addEventListener('click', function () {
    // The remove method is new, this was done as below
    message.remove();
    //message.parentElement.removeChild(message)
  });

// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
message.style.padding = '10px';

// Returns a CSSStyleDeclaration list with all the CSS properties and the specific values of the given element
console.log(getComputedStyle(message));
// To return an specific style from that huge list, we can specify it with dot notation
console.log(getComputedStyle(message).backgroundColor);

// Setting the height of an ellement dinamically usgin the getComputedStyle to determine the height of the element and in top of that adding more px (Using the parseFloat to transform the height in pixels to a floating number that we can operate on js)
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// Changing global variables of css (root variables). The root of css its equivalent of the document.documentElement
document.documentElement.style.setProperty('--color-primary', 'orangered');

// Atributes
// Getting the element and then accessing the atributes (in this case the src atribute of the img logo)
const logo = document.querySelector('.nav__logo');
console.log(logo.src);
console.log(logo.className);

logo.alt = 'Beautiful minimalist logo';
console.log(logo.alt);

console.log(logo.getAttribute('alt'));
logo.setAttribute('company', 'Bankist');
console.log(logo.getAttribute('company'));

// Absolute route
console.log(logo.src);
// Relative route
console.log(logo.getAttribute('src'));

const link = document.querySelector('.nav__link');
// Absolute route
console.log(link.href);
// Relative route
console.log(link.getAttribute('href'));

// Data attributes
// The attribute was data-version-number. When we use it as a property we have to pass it to versionNumber
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('c');
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c');

// Don't use, this will override every class already in the element
logo.className = 'jonas';

// Managing events
// The mouseenter event is just like the hover in CSS
const h1 = document.querySelector('h1');
// Listening to the event once and then removing the eventlistener
const alertH1 = function (e) {
  alert('addEventListener: Great you are reading the heading');

  // Removing an event listener
  h1.removeEventListener('mouseenter', alertH1);
};
h1.addEventListener('mouseenter', alertH1);

// This setting the same response to the same event but with a different sintax, by accesing the event property itself
// h1.onmouseenter = function (e) {
//   alert('addEventListener: Great you are reading the heading');
// };

// Random color generator
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
console.log(randomColor());

// Playing with random colors in the nav to watch how the event travels to its parents from and to the document root

// The e.target will always be the same on this examples. If I click the link, then the event target will be the link on all of the elements that get affected by the same event.
// But when you talk about the event.currentTarget its different, as the currentTarget will always point to the element in which the event is currently on which corresponds to the this keyword of said element. In this case, if I click the nav__link, the link, the container and the nav will change colors, the event.target will always be the link beacuase it was the origin of said event (where the click happened) but the event.currentTarget will differ. In the link, it will be the nav__link element, on the container it will be the nav__links elements and in the nav it will be the nav element.

document.querySelector('.nav__link').addEventListener('click', function (e) {
  e.preventDefault();
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
  console.log(e.currentTarget === this); // true

  // To stop event propagation we can call an specific function:
  e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
  console.log(e.currentTarget === this); // true
});

document.querySelector('.nav').addEventListener('click', function (e) {
  e.preventDefault();
  this.style.backgroundColor = randomColor();
  console.log('NAV', e.target, e.currentTarget);
  console.log(e.currentTarget === this); // true
});
///////////////////////////////////////////////////////////
// DOM Traversing
const h1 = document.querySelector('h1');

// Going downwards: child
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'black';
console.log(h1.firstElementChild.style.color);

// Going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);

// The object itself
h1.closest('h1').style.background = 'var(--gradient-primary)';
// Searching for the closest element with that selector
h1.closest('.header').style.background = 'var(--gradient-secondary)';

// Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

// Searching first for the direct parent and then for the childrens of that parent. The result are all the siblings of the element from which we used this proipertys
console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) {
    el.style.transform = 'scale(0.5)';
  }
});
*/
