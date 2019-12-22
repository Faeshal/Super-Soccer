// jquery 3
$(window).on("load", function() {
  $("#loading")
    .delay(100)
    .fadeOut(50);
  $("#loading-center").click(function() {
    $("#loading").fadeOut(70);
  });
});
