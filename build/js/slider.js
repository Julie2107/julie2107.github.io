'use strict'

const slider = document.querySelector('.swiper-container');

let mySwiper;

 const initSlider = () => {
   if (window.innerWidth < 1024 && slider.dataset.mobile == 'false') {
    mySwiper = new Swiper(slider, {
      slidesPerView: 1,
      spaceBetween: 10,
    
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      }
     });

     slider.dataset.mobile = 'true';
   }

   if (window.innerWidth >= 1024) {
		slider.dataset.mobile = 'false';
		if (slider.classList.contains('swiper-container-initialized')) {
			mySwiper.destroy();
		}
	}
 }

 window.addEventListener('resize', () => {
  initSlider();
 });