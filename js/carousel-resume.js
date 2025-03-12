// //step 1: get DOM
// let nextDom = document.getElementById('nexts');
// let prevDom = document.getElementById('prevs');

// let carouselDom = document.querySelector('.carousel-resume');
// let SliderDom = carouselDom.querySelector('.carousel-resume .carousel-resume__list');
// let thumbnailBorderDom = document.querySelector('.carousel-resume .carousel-resume--thumbnail');
// let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.carousel-resume__item');
// let timeDom = document.querySelector('.carousel-resume .carousel-resume__time');

// thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
// let timeRunning = 3000;
// let timeAutoNext = 7000;

// nextDom.onclick = function(){
//     showSlider('nexts');    
// }

// prevDom.onclick = function(){
//     showSlider('prevs');    
// }
// let runTimeOut;
// let runNextAuto = setTimeout(() => {
//     next.click();
// }, timeAutoNext)
// function showSlider(type){
//     let  SliderItemsDom = SliderDom.querySelectorAll('.carousel-resume .carousel-resume__list .carousel-resume__item');
//     let thumbnailItemsDom = document.querySelectorAll('.carousel-resume .carousel-resume--thumbnail .carousel-resume__item');
    
//     if(type === 'nexts'){
//         SliderDom.appendChild(SliderItemsDom[0]);
//         thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
//         carouselDom.classList.add('nexts');
//     }else{
//         SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
//         thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
//         carouselDom.classList.add('prevs');
//     }
//     clearTimeout(runTimeOut);
//     runTimeOut = setTimeout(() => {
//         carouselDom.classList.remove('nexts');
//         carouselDom.classList.remove('prevs');
//     }, timeRunning);

//     clearTimeout(runNextAuto);
//     runNextAuto = setTimeout(() => {
//         next.click();
//     }, timeAutoNext)
// }

// carousel-resume.js
document.addEventListener('DOMContentLoaded', function() {
  // Get DOM elements
  let nextDom = document.getElementById('nexts');
  let prevDom = document.getElementById('prevs');

  let carouselDom = document.querySelector('.carousel-resume');
  let sliderDom = carouselDom.querySelector('.carousel-resume__list');
  let thumbnailBorderDom = document.querySelector('.carousel-resume--thumbnail');
  let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.carousel-resume__item');
  let timeDom = document.querySelector('.carousel-resume__time');

  // Initialize
  if (thumbnailItemsDom.length > 0) {
    thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
  }
  
  let timeRunning = 3000;
  let timeAutoNext = 7000;

  // Button event handlers
  nextDom.onclick = function() {
    showSlider('next');    
  }

  prevDom.onclick = function() {
    showSlider('prev');    
  }

  // Set up auto-advance
  let runTimeOut;
  let runNextAuto = setTimeout(() => {
    nextDom.click();
  }, timeAutoNext);

  function showSlider(type) {
    let sliderItemsDom = sliderDom.querySelectorAll('.carousel-resume__item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel-resume--thumbnail .carousel-resume__item');
    
    if (sliderItemsDom.length <= 1) return; // Не выполнять, если только один элемент
    
    if(type === 'next') {
      sliderDom.appendChild(sliderItemsDom[0]);
      thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
      carouselDom.classList.add('next');
    } else {
      sliderDom.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
      thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
      carouselDom.classList.add('prev');
    }
    
    // Remove animation classes after transition
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
      carouselDom.classList.remove('next');
      carouselDom.classList.remove('prev');
    }, timeRunning);

    // Reset auto-advance timer
    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
      nextDom.click();
    }, timeAutoNext);
  }
});




