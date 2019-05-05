//Navbar expand/collapse
$(".nav-btn").on("click", function(){
  $(".menu").toggleClass("show");
})

//changing the color of the navbar while scrolling below the main position
$(function () {
  $(document).scroll(function () {
    var $nav = $("#mainNavbar");
    $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
  });
});