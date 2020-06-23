$(document).ready(() =>{
  $(".prod1").on("click", () =>{
    $(".producto img").toggleClass("animate__slideInLeft");
    $(".producto img").addClass("animate__fadeInLeft");
    $(".producto img").attr("src","./img/amazon_echo_solo.png");
  });
  $(".prod2").on("click", () =>{
    $(".producto img").toggleClass("animate__slideInLeft");
    $(".producto img").addClass("animate__fadeInLeft");
    $(".producto img").attr("src","./img/amazon_echo_negro.png");
  });
  $(".prod3").on("click", () =>{
    $(".producto img").toggleClass("animate__slideInLeft");
    $(".producto img").addClass("animate__fadeInLeft");
    $(".producto img").attr("src","./img/amazon_echo.png");
  });
});