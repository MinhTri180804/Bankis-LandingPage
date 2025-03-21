'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const navLinkElements = document.querySelectorAll('a.nav__link');
const section_1 = document.querySelector('#section--1');
const sectionElements = document.querySelectorAll('section.section');
const navLinks = document.querySelector('.nav__links');
const nav = document.querySelector('nav.nav');
const navPlaceholder = document.querySelector('.nav--placeholder');
const allFeaturesImage = document.querySelectorAll('img.features__img');

const logo = document.getElementById('logo');
const message = document.createElement('div');
message.classList.add('cookie-message');
message.style.width = '120%';

message.innerHTML =
  'We use cookied for imporved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

window.addEventListener('load', () => {
  if (window.location.hash) {
    setTimeout(() => {
      const locationHash = window.location.hash;
      document
        .querySelector(locationHash)
        .scrollIntoView({ behavior: 'smooth' });
    }, 100);
  } else {
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  }
});

navLinks.addEventListener('click', e => {
  e.preventDefault();
  const targetElement = e.target;
  if (e.target.classList.contains('nav__link')) {
    const idElementScrollTo = targetElement.getAttribute('href').trim();
    history.pushState(null, null, idElementScrollTo);
    document
      .querySelector(idElementScrollTo)
      .scrollIntoView({ behavior: 'smooth' });
  }
});

// Handle operations tab event
const operationsTabContainer = document.querySelector(
  '.operations__tab-container',
);

const handleOperationsTabEvent = () => {
  let currentElementTabActive = null;
  let currentElementContentActive = null;

  return event => {
    event.preventDefault();
    const targetElement = event.target.closest('.operations__tab');
    if (!targetElement) return;
    const dataTab = targetElement.dataset.tab;
    if (!dataTab) return console.error('Element not have data-tab');

    const parentOperations = targetElement.closest('.operations');

    const elementTabActive = parentOperations.querySelector(
      `.operations__tab--${dataTab}`,
    );
    const elementContentActive = parentOperations.querySelector(
      `.operations__content--${dataTab}`,
    );

    if (
      currentElementTabActive !== null &&
      currentElementContentActive !== null
    ) {
      if (
        currentElementContentActive === elementContentActive &&
        currentElementTabActive === elementTabActive
      )
        return;
      else {
        currentElementContentActive.classList.remove(
          'operations__content--active',
        );
        currentElementTabActive.classList.remove('operations__tab--active');
      }
    } else {
      parentOperations
        .querySelector('.operations__tab--active')
        .classList.remove('operations__tab--active');
      parentOperations
        .querySelector('.operations__content--active')
        .classList.remove('operations__content--active');
    }

    elementTabActive.classList.add('operations__tab--active');
    elementContentActive.classList.add('operations__content--active');

    currentElementTabActive = elementTabActive;
    currentElementContentActive = elementContentActive;
  };
};

operationsTabContainer.addEventListener('click', handleOperationsTabEvent());

// Handle mouse nav link
const handleMouseNavLinks = (opacity, e) => {
  if (e.target.classList.contains('nav__link')) {
    const targetElement = e.target;
    navLinks.querySelectorAll('.nav__link').forEach(element => {
      if (element !== targetElement) {
        element.style.opacity = opacity;
      }
    });
    navLinks.closest('.nav').querySelector('img').style.opacity = opacity;
  }
};

navLinks.addEventListener('mouseover', handleMouseNavLinks.bind(null, 0.5));

navLinks.addEventListener('mouseout', handleMouseNavLinks.bind(null, 1));

// Handle sticky navbar
const stickyNav = entries => {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const stickyNavOptions = {
  root: null,
  threshold: [0, 1],
  rootMargin: `${nav.getBoundingClientRect().height}px`,
};

const navStickyObserver = new IntersectionObserver(stickyNav, stickyNavOptions);
navStickyObserver.observe(navPlaceholder);

// Handle animation display section for scroll event
const displaySections = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  console.log(entry.target);
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const displaySectionOptions = {
  root: null,
  threshold: 0.2,
};

const displaySectionObserver = new IntersectionObserver(
  displaySections,
  displaySectionOptions,
);
sectionElements.forEach(section => displaySectionObserver.observe(section));

// Handle lazy loading image features

const imageFeaturesLazy = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  const targetElement = entry.target;
  targetElement.src = targetElement.dataset.src;
  targetElement.addEventListener('load', () => {
    targetElement.classList.remove('lazy-img');
  });
  observer.unobserve(targetElement);
};

const imageFeaturesObserver = new IntersectionObserver(imageFeaturesLazy, {
  root: null,
  threshold: 0.3,
});

allFeaturesImage.forEach(featuresImage =>
  imageFeaturesObserver.observe(featuresImage),
);
