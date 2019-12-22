const api_key = "a3b5f17869d34c07b1a9132daaae36c4";
var uefa_url = "https://api.football-data.org/v2/competitions/2001/";
var standings_url =
  "https://api.football-data.org/v2/competitions/2001/standings?status=FINISHED&standingType=TOTAL";
var match_url =
  "https://api.football-data.org/v2/competitions/2001/matches?stage=GROUP_STAGE&matchday=6";
var allteam_url = "https://api.football-data.org/v2/teams?area=Europe";
var dataTeam;

// Blok kode berikut akan dipanggil jika fetch berhasil dieksekusi
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() ini akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode ini digunakan untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode ini digunakan untuk meng-handle kesalahan yang ada di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode ini digunakan untuk melakukan request data json liga uefa
function getUefaLiga() {
  if ("caches" in window) {
    caches.match(uefa_url).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          var articleHTML = `
            <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                <img class="activator" src="${data.emblemUrl}">
              </div>
              <div class="card-content">
                <span class="card-title activator grey-text text-darken-4">${data.name}<i class="material-icons right">more_vert</i></span>
              </div>
              <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">${data.name}<i class="material-icons right">close</i></span>
                <p>The UEFA Champions League (abbreviated as UCL) is an annual club football competition organised by the Union of European Football Associations (UEFA) and contested by top-division European clubs. It is one of the most prestigious tournaments in the world and the most prestigious club competition in European football, played by the national league champions (and, for some nations, one or more runners-up) of the strongest UEFA national associations.</p>
              </div>
            </div>
          `;
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("home").innerHTML = articleHTML;
        });
      }
    });
  }

  fetch(
    uefa_url,
    {
      headers: {
        "X-Auth-Token": api_key
      }
    },
    data => {
      return data;
    }
  )
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek JavaScript dari response.json() masuk lewat variabel data.
      console.log(data);
      // Menyusun komponen card artikel secara dinamis
      var articleHTML = `
         <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
              <img class="activator" src="${data.emblemUrl}">
            </div>
            <div class="card-content">
              <span class="card-title activator grey-text text-darken-4">${data.name}<i class="material-icons right">more_vert</i></span>
            </div>
            <div class="card-reveal">
              <span class="card-title grey-text text-darken-4">${data.name}<i class="material-icons right">close</i></span>
              <p>The UEFA Champions League (abbreviated as UCL) is an annual club football competition organised by the Union of European Football Associations (UEFA) and contested by top-division European clubs. It is one of the most prestigious tournaments in the world and the most prestigious club competition in European football, played by the national league champions (and, for some nations, one or more runners-up) of the strongest UEFA national associations.</p>
            </div>
          </div>
      `;
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("home").innerHTML = articleHTML;
    });
}

// Blok kode ini digunakan untuk melakukan request data json standings
function getStandings() {
  if ("caches" in window) {
    caches.match(standings_url).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          var articlesHTML = "";
          data.standings.forEach(function(article) {
            articlesHTML += `
              <div class="card">
                <div class="card-content">
                  <span class="card-title truncate">${article.group}</span>
                <table>
                  <tr>
                    <td>Club</td>
                    <td>Played</td>
                    <td>Points</td>
                  </tr>
                  <tr>
                    <td><img src="${article.table[0].team.crestUrl}" width="20" />
                    ${article.table[0].team.name}</td>
                    <td>${article.table[0].playedGames}</td>
                    <td>${article.table[0].points}</td>
                  </tr>
                  <tr>
                    <td><img src="${article.table[1].team.crestUrl}" width="20" />
                    ${article.table[1].team.name}</td>
                    <td>${article.table[1].playedGames}</td>
                    <td>${article.table[1].points}</td>
                  </tr>
                  <tr>
                    <td><img src="${article.table[2].team.crestUrl}" width="20" />
                    ${article.table[2].team.name}</td>
                    <td>${article.table[2].playedGames}</td>
                    <td>${article.table[2].points}</td>
                  </tr>
                  <tr>
                    <td><img src="${article.table[3].team.crestUrl}" width="20" /> 
                    ${article.table[3].team.name}</td>
                    <td>${article.table[3].playedGames}</td>
                    <td>${article.table[3].points}</td>
                  </tr>
                </table>
                </div>
              </div>
            `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("standings").innerHTML = articlesHTML;
        });
      }
    });
  }

  fetch(
    standings_url,
    {
      headers: {
        "X-Auth-Token": api_key
      }
    },
    data => {
      return data;
    }
  )
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.

      // Menyusun komponen card artikel secara dinamis
      var articlesHTML = "";
      data.standings.forEach(function(article) {
        articlesHTML += `
          <div class="card">
            <div class="card-content">
              <span class="card-title truncate">${article.group}</span>
                <table>
                  <tr>
                    <td>Club</td>
                    <td>Played</td>
                    <td>Points</td>
                  </tr>
                  <tr>
                    <td><img src="${article.table[0].team.crestUrl}" width="20" />
                    ${article.table[0].team.name}</td>
                    <td>${article.table[0].playedGames}</td>
                    <td>${article.table[0].points}</td>
                  </tr>
                  <tr>
                    <td><img src="${article.table[1].team.crestUrl}" width="20" />
                    ${article.table[1].team.name}</td>
                    <td>${article.table[1].playedGames}</td>
                    <td>${article.table[1].points}</td>
                  </tr>
                  <tr>
                    <td><img src="${article.table[2].team.crestUrl}" width="20" />
                    ${article.table[2].team.name}</td>
                    <td>${article.table[2].playedGames}</td>
                    <td>${article.table[2].points}</td>
                  </tr>
                  <tr>
                    <td><img src="${article.table[3].team.crestUrl}" width="20" /> 
                    ${article.table[3].team.name}</td>
                    <td>${article.table[3].playedGames}</td>
                    <td>${article.table[3].points}</td>
                  </tr>
                </table>
                </div>
              </div>
            `;
      });

      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("standings").innerHTML = articlesHTML;
    })
    .catch(error);
}

// Blok kode ini digunakan untuk melakukan request data json matches
function getMatches() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  if ("caches" in window) {
    caches.match(match_url).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          var articlesHTML = "";
          data.matches.forEach(function(article) {
            articlesHTML += `
                  <table>
                  <tr>
                    <td>${article.group}</td>
                    <td>${article.utcDate}</td>
                    <td><b>${article.homeTeam.name}</b></td>
                    <td>${article.score.fullTime.homeTeam}</td>
                    <td> - </td>
                    <td>${article.score.fullTime.awayTeam}</td>
                    <td><b>${article.awayTeam.name}</b></td>
                  </tr>
                  </table>
                `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("match").innerHTML = articlesHTML;
        });
      }
    });
  }

  fetch(
    match_url,
    {
      headers: {
        "X-Auth-Token": api_key
      }
    },
    data => {
      return data;
    }
  )
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.

      // Menyusun komponen card artikel secara dinamis
      var articlesHTML = "";
      data.matches.forEach(function(article) {
        articlesHTML += `
                  <table>
                  <tr>
                    <td>${article.group}</td>
                    <td>${article.utcDate}</td>
                    <td><b>${article.homeTeam.name}</b></td>
                    <td>${article.score.fullTime.homeTeam}</td>
                    <td> - </td>
                    <td>${article.score.fullTime.awayTeam}</td>
                    <td><b>${article.awayTeam.name}</b></td>
                  </tr>
                  </table>
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("match").innerHTML = articlesHTML;
    })
    .catch(error);
}

// Blok kode ini digunakan untuk melakukan request data json matches
function getTeams() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  if ("caches" in window) {
    caches.match(allteam_url).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          var articlesHTML = "";
          data.matches.forEach(function(article) {
            articlesHTML += `
              <div class="card horizontal">
                <div class="card-image">
                  <img class="responsive-img materialboxed" src="${article.crestUrl}"/>
                </div>
                <div class="card-stacked">
                  <div class="card-content">
                    <p>${article.shortName} <br> ${article.email} <br> ${article.website}</p>
                  </div>
                  <div class="card-action">
                    <a class="waves-effect waves-light btn green" onclick="addTeamClick(${article.id})">
                      <i class="material-icons">favorite_border</i>Favourite</a>
                  </div>
                </div>
              </div>
            `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("team").innerHTML = articlesHTML;
        });
      }
    });
  }

  fetch(
    allteam_url,
    {
      headers: {
        "X-Auth-Token": api_key
      }
    },
    data => {
      return data;
    }
  )
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.

      // Menyusun komponen card artikel secara dinamis
      var articlesHTML = "";
      dataTeam = data;
      data.teams.forEach(function(article) {
        articlesHTML += `
        <div class="card horizontal">
          <div class="card-image">
            <img class="responsive-img materialboxed" src="${article.crestUrl}"/>
          </div>
          <div class="card-stacked">
            <div class="card-content">
              <p>${article.shortName} <br> ${article.email} <br> ${article.website}</p>
            </div>
            <div class="card-action">
              <a class="waves-effect waves-light btn green" onclick="addTeamClick(${article.id})">
                <i class="material-icons">favorite_border</i>Favourite</a>
            </div>
          </div>
        </div>
        `;
      });

      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("team").innerHTML = articlesHTML;
      document.querySelector("#addButton").addEventListener("click", db, false);
    })
    .catch(error);
}

function getFavTeams() {
  dbPromise
    .then(function(db) {
      var tx = db.transaction("team", "readonly");
      var store = tx.objectStore("team");
      var request = store.getAll();
      return request;
    })
    .then(function(data) {
      var html = "";
      data.forEach(function(team) {
        html += `
        <div class="card">
          <div class="card-content">
            <img class="responsive-img materialboxed" src="${team.crestUrl}" width="50" />
            ${team.name}
          </div>
          <div class="card-action">
            <a class="waves-effect waves-light btn green" onclick="delTeamClick(${team.id})"><i class="material-icons right"></i>Delete Favourite</a>
          </div>
        </div>
      `;
      });
      if (data.length == 0)
        html += '<h6 class="center-align">No favorite team found!</6>';
      document.getElementById("favourite").innerHTML = html;
    });
}

//penyimpanan indexedDB
var dbPromise = idb.open("football", 1, function(upgradeDb) {
  if (!upgradeDb.objectStoreNames.contains("team")) {
    var peopleOS = upgradeDb.createObjectStore("team", { keyPath: "id" });
  }
});

var addTeamClick = id => {
  var notif = confirm("Save this favourite team?");
  if (notif == true) {
    var article = dataTeam.teams.filter(data => data.id == id)[0];
    dbPromise.then(function(db) {
      const tx = db.transaction("team", "readwrite");
      tx.objectStore("team").put(article);
      return tx.complete;
    });
    console.log(id + " added to favourite");
  }
};

var delTeamClick = id => {
  var notif = confirm("Delete this from favourite team?");
  if (notif == true) {
    dbPromise
      .then(function(db) {
        var tx = db.transaction("team", "readwrite");
        tx.objectStore("team").delete(id);
        return tx.complete;
      })
      .then(function() {
        console.log("Item deleted");
      });
    console.log(id + " has been deleted");
  }
};
