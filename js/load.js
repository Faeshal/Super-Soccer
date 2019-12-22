// loader dibuat dengan jquery 3
// digunakan untuk mentriger animasi native yang sudah dibuat di Load.css
// melalui id Loading
$(window).on("load", function() {
  $("#loading")
    .delay(100)
    .fadeOut(50);
  $("#loading-center").click(function() {
    $("#loading").fadeOut(70);
  });
});
