const demo = () => 'Webpack Boilerplate v5.13.0 - SASS/PostCSS, ES6/7, browser sync, source code listing and more.';
// core version + navigation, pagination modules:
import Swiper from 'swiper/bundle';
// eslint-disable-next-line no-console
// initialization swiper 1
const swiper = new Swiper('#head-slider', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
  
    // If we need pagination
    pagination: {
      el: '.slider__setting-pag',
      clickable: true,
    },
    breakpoints: {
      900: {
        slidesPerView: 1,
        spaceBetween: 30
      },
    }
  });


// initialization mySwiper
const swiper_2 = new Swiper("#slider-2", {
  // Optional parameters
  slidesPerView: 5,
  spaceBetween: 30,
  direction: 'horizontal',
  freeMode: true, 
  // display pagination
  pagination: {
    el: ".mySwiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: '.imagesslider__prev',
    prevEl: '.imagesslider__next',
  },
  breakpoints: {
    850: {
      slidesPerView: 3,
      spaceBetween: 30
    },
  }
});


// initialization slider 3 
const swiper_3 = new Swiper("#footerslider", {
  // Optional parameters
  slidesPerView: 6,
  spaceBetween: 30,
  freeMode: true,
  // display nav but
  navigation: {
    nextEl: '.footerslider__next',
    prevEl: '.footerslider__prev',
  }
});