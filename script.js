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

document.querySelector('.nav__links').addEventListener('click', e => {
  e.preventDefault();
  const targetElement = e.target;
  if (e.target.classList.contains('nav__link')) {
    const idElementScrollTo = targetElement.getAttribute('href');
    history.pushState(null, null, idElementScrollTo);
    document
      .querySelector(idElementScrollTo)
      .scrollIntoView({ behavior: 'smooth' });
  }
});
