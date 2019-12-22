// Jquery Button UP
// Fungsi ini digunakan untuk mentriger id #topBtn yang ada di topBtn.css
// Tombol otomatis muncul jika scroll diarahkan kebawah
$(document).ready(function() {
  $(window).scroll(function() {
    if ($(this).scrollTop() > 40) {
      $("#topBtn").fadeIn();
    } else {
      $("#topBtn").fadeOut();
    }
  });

  $("#topBtn").click(function() {
    $("html,body").animate({ scrollTop: 0 }, 800);
  });
});
