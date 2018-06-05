let slideIndex = 1;

const showSlides = n => {
  let i;
  const slides = document.querySelectorAll('.screenshots-item');
  if (n > slides.length) {slideIndex = 1;}
  if (n < 1) {slideIndex = slides.length;}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  slides[slideIndex - 1].style.display = 'block';
};

const plusSlides = n => {
  showSlides(slideIndex += n);
};
const currentSlide = n => {
  showSlides(slideIndex = n);
};
showSlides(slideIndex);

const next = document.querySelector('.next');
const prev = document.querySelector('.prev');

next.addEventListener('click', e => {
  e.preventDefault();
  plusSlides(1);
});

prev.addEventListener('click', e => {
  e.preventDefault();
  plusSlides(-1);
});

const scroll = new SmoothScroll('a[href*="#"]');

const nav = document.querySelector('.header');
const spy = new MenuSpy(nav);