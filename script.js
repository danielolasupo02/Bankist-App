'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('header');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(
  btn => btn.addEventListener('click', openModal)
)



btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = 'We use cookies for improved functionality and analytics <button class="btn btn--close--cookie"> Got it! </button> ';
header.prepend(message); 


document.querySelector('.btn--close--cookie').addEventListener('click', function() {
  message.remove();
});

const navBar = document.querySelector('.nav');


message.style.backgroundColor = '#37383d';
message.style.width = '120%';
message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';
// console.log(getComputedStyle(message).backgroundColor);

const btnScrollTo = document.querySelector('.btn--scroll-to');
const s1 = document.querySelector('#section--1');


btnScrollTo.addEventListener('click', function (e) {
  s1.scrollIntoView({behavior: 'smooth'});
})



//PAGE NAVIGATION
// document.querySelectorAll('.nav__link').forEach(
// 	function (el) {
// 		el.addEventListener('click', function (e) {
// 			e.preventDefault();
//       const id = this.getAttribute('href');
//       console.log(id);
//       document.querySelector(id).scrollIntoView({behavior: 'smooth'});
// 		});
// 	}
// );



document.querySelector('.nav__links').addEventListener(
  'click', function(e) {
    e.preventDefault();

    if (e.target.classList.contains('nav__link')) {
       const id = e.target.getAttribute('href');
       console.log(id);
       document.querySelector(id).scrollIntoView({behavior: 'smooth'});
      
    }  
  }
)

const h1 = document.querySelector('h1');
// console.log(h1.closest('.header'));
// h1.closest('.header').style.background = 'var(--gradient-secondary)';
h1.closest('h1').style.background = 'var(--gradient-primary)';
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';


const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContents = document.querySelectorAll('.operations__content');


// tabs.forEach(
//   function (el) {
//     el.addEventListener('click', function () {
//       console.log('You clicked');
//     })
//   }
// )

tabContainer.addEventListener('click', 
  function (e) {
    //EVENT DELEGATION
    const clicked = e.target.closest('.operations__tab');
    console.log(clicked);
    
    //GUARD CLAUSE 
    if (!clicked) return;

    //REMOVE ACTIVE TAB FEATURE FROM PREVIOUS ACTIVE TAB CLASS LIST
    tabs.forEach( t => t.classList.remove('operations__tab--active'));
    
    //ADD ACTIVE TAB FEATURE TO THE ACTIVE TAB CLASS LIST
    clicked.classList.add('operations__tab--active');

    //LOOP THROUGH ALL TAB CONTENTS AND REMOVE THE ACTIVE CLASS FROM THEM
    tabContents.forEach(
      e => e.classList.remove('operations__content--active')
    )

    //ACTIVATE THE TEXT CONTENT OF TAB CLICKED BASED ON DATASET NUMBER
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
    

  }

  
);


//MENU FADE ANIMATION

//HANDLING MOUSE OVER AND MOUSE OUT EVENT
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    //TARGET THE LINK HOVERED ON
    const link = e.target;
    //TARGET ALL LINKS OR SIBLINGS OF THE CURRENTLY CLICKED LINK
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    //TARGET THE IMAGE IN THE NAV BAR
    const logo = link.closest('.nav').querySelector('img');
    //LOOP THROUGH ALL THE SIBLINGS OF THE CURRENTLY CLICKED LINK AND SET THEIR OPACITY TO 0.1
    siblings.forEach( s => {
        if (s != link) s.style.opacity = this;
    });
    logo.style.opacity = this;
    

  }
}



//Passing Argument into Handler
//MOUSE OVER EVENT
navBar.addEventListener('mouseover', handleHover.bind(0.5));

//MOUSE OUT 
navBar.addEventListener('mouseout', handleHover.bind(1));







// //IMPLEMENTING STICKY NAVIGATION

// window.addEventListener('scroll', () => {
//   // Get the current scroll position
//   const scrollPos = window.scrollY;

//   // Check if the current scroll position is greater than or equal to the height of the navbar
//   if (scrollPos >= navbar.offsetHeight) {
//     // If it is, add the "sticky" class to the navbar
//     navbar.classList.add('sticky');
//   } else {
//     // Otherwise, remove the "sticky" class from the navbar
//     navbar.classList.remove('sticky');
//   }
// });



//IMPLEMENTING STICKY NAVIGATION



// window.addEventListener('scroll', function() {
//   const nav = document.querySelector('.nav');
//   const scrollPos = window.scrollY;

//   if (scrollPos >= nav.offsetHeight) {
//     nav.classList.add('sticky');
//   }
//   else {
//     nav.classList.remove('sticky');
//   }
// })


// const obsCallback = function (entries, observer) {
//   entries.forEach(
//     entry => {console.log(entry)}
//   )
// }

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2]
// }


// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);




// const section1 = document.querySelector('#section--1');



//STICKY NAVIGATION
const nav = document.querySelector('.nav');
const navHeight = nav.getBoundingClientRect().height;


const stickyNav = function (entries) {
    entries.forEach(
      entry => {
        if (!entry.isIntersecting) nav.classList.add('sticky');
        else  nav.classList.remove('sticky');
      }
    )
  };



const obsOptions = {
  root: null,
  threshold: 0, //This serves as the percentage at which the call back function would be called
  rootMargin: `-${navHeight}px`,
}

const observer = new IntersectionObserver(
  stickyNav, obsOptions
);


observer.observe(header);





//REVEAL SECTIONS
const allSections = document.querySelectorAll('.section');

const revealSections = function (entries, observer) {
  const [entry] = entries;
  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserver(entry.target);
}


const revealobserver = new IntersectionObserver(revealSections, {
  root: null,
  threshold: 0.3,
})


allSections.forEach(
  section => {
    // section.classList.add('section--hidden');
    revealobserver.observe(section);
  }
)



//LAZY IMAGE LOADING
const allImgs = document.querySelectorAll('.lazy-img');


const revealImg = (entries) => {
  const [entry] = entries;
  if(!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', 
    () => {
      entry.target.classList.remove('lazy-img')
    }
  )
  observer.unobserve(entry.target);

}

const imgObserver = new IntersectionObserver(revealImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});


allImgs.forEach(
  img => {
    imgObserver.observe(img);
  }
)


//Slider Component
const slides = document.querySelectorAll('.slide');


//Slider
const slider = function () {
  const slider = document.querySelector('.slider');
  // slider.style.transform = 'scale(0.4) translateX(-800px)';
  // slider.style.overflow = 'visible';
  
  
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotsContainer = document.querySelector('.dots');
  
  let curSlide = 0;
  let maxSlide = slides.length;
  
  //Create slide dots
  const createDots = function () {
    slides.forEach( function(_, i){
      dotsContainer.insertAdjacentHTML('beforeend', 
      `<button class="dots__dot" data-slide=${i}> </button>`
      )
    })
  }
  
  
  
  //activate slides
  const activateDots = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(
      dot => dot.classList.remove('dots__dot--active')
    );
  
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active'); 
  }
  
  
  
  //goTo Slide
  const goToSlide = (slide) => {
    slides.forEach(
      (s, i) => {
         s.style.transform = `translateX(${100*(i - slide)}%)`;
      }
    )
    //-100% 0% 100% 200%
  }
  
  
  
  //Next Slide
  const nextSlide = () => {
    if (curSlide < maxSlide - 1) curSlide++;
    else curSlide = 0;
    goToSlide(curSlide);
    activateDots(curSlide);
  }
  
  //Previous Slide
  const prevSlide = () => {
    
    if (curSlide > 0) curSlide--;
    else curSlide = 0;
    goToSlide(curSlide);
    activateDots(curSlide);
  }
  
  //Initialization 
  const init = () => {
    goToSlide(0); //0% 100% 200% 300%
    createDots();
    activateDots(0);
  }
  init();
  
  
  //Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);
  
  document.addEventListener('keydown', (e) => {
    e.key === 'ArrowLeft' && prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });
  
  
  dotsContainer.addEventListener('click', 
    (e) => {
      if (e.target.classList.contains('dots__dot')) {
        const {slide} = e.target.dataset;
        goToSlide(slide);
        activateDots(slide);
      }
    }
  )
  
}


slider();

