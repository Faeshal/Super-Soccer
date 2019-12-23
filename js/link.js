// NOTE : Navigation Bar Materialize

document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);
  var typeFavorit = "";
  loadNav();
  function loadNav() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status != 200) return;
        document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
          elm.innerHTML = xhttp.responseText;
        });
        document
          .querySelectorAll(".sidenav a, .topnav a")
          .forEach(function(elm) {
            elm.addEventListener("click", function(event) {
              var sidenav = document.querySelector(".sidenav");
              M.Sidenav.getInstance(sidenav).close();
              page = event.target.getAttribute("href").substr(1);
              loadPage(setupPage(page));
            });
          });
      }
    };
    xhttp.open("GET", "nav.html", true);
    xhttp.send();
  }
  var page = window.location.hash.substr(1);
  loadPage(setupPage(page));
  // NOTE : Routing Halaman
  function setupPage(page) {
    if (page == "" || page == "#") {
      page = "standing";
    } else if (page === "allSave" || page === "saved") {
      page = "allSave";
      typeFavorit = "jadwal";
    } else {
      typeFavorit = "";
    }
    return page;
  }

  function loadPage(page) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      var content = document.querySelector("#body-content");

      if (this.readyState == 4) {
        if (page === "standing") {
          getStanding();
        } else if (page === "matches") {
          getMatchByIdLeague();
        } else if (page === "allSave") {
          grab(typeFavorit);
        }

        // NOTE : Pemberian kondisi apabila halaman tidak ada / ada yang salah
        if (this.status == 200) {
          content.innerHTML = xhttp.responseText;
        } else if (this.status == 404) {
          content.innerHTML = "<p>Page Not Found</p>";
        } else {
          content.innerHTML = "<p>Something was Wrong</p>";
        }
      }
    };
    xhttp.open("GET", "pages/" + page + ".html", true);
    xhttp.send();
  }
});
