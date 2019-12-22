// jquery 3 loading image
// digunakan untuk mentriger animasi native yang sudah dibuat di Load.css
// Lewat id Loading
$(window).on("load", function() {
  $("#loading")
    .delay(100)
    .fadeOut(50);
  $("#loading-center").click(function() {
    $("#loading").fadeOut(70);
  });
});
