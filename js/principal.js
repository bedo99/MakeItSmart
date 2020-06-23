$(document).ready(function () {
  $('.venobox').venobox();
});

AOS.init({
  duration: 1000,
  easing: "ease-in-out",
  once: true,
  mirror: false
});

window.sr = ScrollReveal();
sr.reveal('.info-left', {
  duration: 2000,
  origin: 'left',
  distance: '300px',
  viewFactor: 0.2
});
sr.reveal('.info-right', {
  duration: 2000,
  origin: 'right',
  distance: '300px',
  viewFactor: 0.2
});
sr.reveal('.showcase-left', {
  duration: 2000,
  origin:'top',
  distance:'300px'
});
