const APIKEY = "744a068822a147b1b04d51e1881772ef";
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec"
];

// NOTE : Fungsi untuk merubah format tanggal dan bulan
var formatDate = date => {
  return `${date.getDate()} ${
    monthNames[date.getMonth()]
  } ${date.getFullYear()} ${formatTime(date)}`;
};

// NOTE : Custom tanggal supaya menjadi format 12 (PM/AM)
function formatTime(date) {
  let hour = date.getHours();
  let min = date.getMinutes();
  let part = hour > 12 ? "pm" : "am";

  min = (min + "").length == 1 ? `0${min}` : min;
  hour = hour > 12 ? hour - 12 : hour;
  hour = (hour + "").length == 1 ? `0${hour}` : hour;
  var output = hour + ":" + min + " " + part;
  return output;
}

// NOTE : Fetching Peringkat klasemen sementara
function getStanding() {
  if ("caches" in window) {
    caches
      .match(
        "https://api.football-data.org/v2/competitions/2021/standings?standingType=TOTAL"
      )
      .then(response => {
        if (response) {
          response.json().then(data => {
            var viewHTML = "";
            data.standings.forEach(standing => {
              var viewData = "";
              standing.table.forEach(team => {
                viewData += `
                <tr>
                <td class="center-align">${team.position}</td>
                <td>
                <p class="hide-on-small-only">
                <img src=${team.team.crestUrl.replace(
                  /^http:\/\//i,
                  "https://"
                )} class = "show-on-medium-and-up show-on-medium-and-down" alt="logo team" style="float:left;width:22px;height:22px;margin-right:20px">
                ${team.team.name}
                </p>
                <p class="hide-on-med-and-up">
                <img src=${
                  team.team.crestUrl
                }  alt="logo team" style="float:left;width:22px;height:22px;margin-right:20px">
                </p>
                </td>
                  <td class="center-align">${team.playedGames}</td>
                  <td class="center-align">${team.won}</td>
                  <td class="center-align">${team.draw}</td>
                  <td class="center-align">${team.lost}</td>
                  <td class="center-align">${team.goalsFor}</td>
                  <td class="center-align">${team.goalsAgainst}</td>
                  <td class="center-align">${team.goalDifference}</td>
                  <td class="center-align">${team.points}</td>
                </tr>`;
              });

              viewHTML +=
                `
                <br>
                <h5 class="center-align white-text">STANDING</h5> 
                <hr>
                <br>
                <table class="responsive-table white-text grey darken-3" >
                <thead>
                  <tr>
                    <th class="center-align">Position</th>
                    <th>Team</th>
                    <th class="center-align">Played</th>
                    <th class="center-align">Won</th>
                    <th class="center-align">Draw</th>
                    <th class="center-align">Lost</th>
                    <th class="center-align">GF</th>
                    <th class="center-align">GA</th>
                    <th class="center-align">GD</th>
                    <th class="center-align">Points</th>
                  </tr>
                </thead>
                <tbody>` +
                viewData +
                `</tbody>
                </table>
              `;
            });
            document.getElementById("standingTable").innerHTML = viewHTML;
          });
        }
      });
  }

  fetch(
    "https://api.football-data.org/v2/competitions/2021/standings?standingType=TOTAL",
    {
      headers: {
        "X-Auth-Token": APIKEY
      }
    }
  )
    .then(response => {
      if (response.status !== 200) {
        console.log(response.status);
        return Promise.reject(new Error(response.statusText));
      } else {
        return Promise.resolve(response);
      }
    })
    .then(response => response.json())
    .then(data => {
      var viewHTML = "";
      data.standings.forEach(standing => {
        var viewData = "";
        standing.table.forEach(team => {
          viewData += `<tr>
            <td class="center-align">${team.position}</td>
            <td>
            <p class="hide-on-small-only">
            <img src=${team.team.crestUrl.replace(
              /^http:\/\//i,
              "https://"
            )} class = "text-bold show-on-medium-and-up show-on-medium-and-down" alt="logo team" style="float:left;height:25px;width:25px;margin-right:10px">
            ${team.team.name}
            </p>
            <p class="hide-on-med-and-up">
            <img src=${
              team.team.crestUrl
            }  alt="logo team" style="float:left;height:25px;width:25px;margin-right:10px">
            </p>
            </td>
              <td class="center-align">${team.playedGames}</td>
              <td class="center-align">${team.won}</td>
              <td class="center-align">${team.draw}</td>
              <td class="center-align">${team.lost}</td>
              <td class="center-align">${team.goalsFor}</td>
              <td class="center-align">${team.goalsAgainst}</td>
              <td class="center-align">${team.goalDifference}</td>
              <td class="center-align">${team.points}</td>
            </tr>`;
        });

        viewHTML +=
          `
            <br>
            <h5 class="center-align white-text">STANDING</h5> 
            <hr>
            <br>
            <table class="responsive-table white-text grey darken-3" >
            <thead>
              <tr>
                <th class="center-align">Rank</th>
                <th class="center-align">Team</th>
                <th class="center-align">Played</th>
                <th class="center-align">Won</th>
                <th class="center-align">Draw</th>
                <th class="center-align">Lost</th>
                <th class="center-align">GF</th>
                <th class="center-align">GA</th>
                <th class="center-align">GD</th>
                <th class="center-align">Points</th>
              </tr>
            </thead>
            <tbody>` +
          viewData +
          `</tbody>
            </table>
          `;
      });
      document.getElementById("standingTable").innerHTML = viewHTML;
    })
    .catch(error => console.log(error));
}

// NOTE : Fetch Jadwal Pertandingan Liga Inggris
function getMatchByIdLeague() {
  return new Promise((resolve, reject) => {
    if ("caches" in window) {
      caches
        .match(
          "https://api.football-data.org/v2/competitions/2021/matches?status=SCHEDULED"
        )
        .then(response => {
          if (response) {
            response.json().then(data => {
              var dataMatchesHtml = "";
              var match = data.matches;
              var maxLoopData = match.length;
              var i = 0;
              // NOTE : Batasi Pertanding hanya 40 saja yang tampil
              if (match.length > 40) {
                maxLoopData = 40;
              }
              while (i < maxLoopData) {
                dataMatchesHtml += `
      <div class="col s12">
        <div class="card card-border grey darken-3 white-text">
          <div class="card-content">
            <div center-align>
              <div class="center-align">${formatDate(
                new Date(match[i].utcDate)
              )}</div>
              <div class="row" style="margin:20px">
                <div class="col s5 truncate center-align">
                  <span class="white-text text-darken-2">  ${
                    match[i].homeTeam.name
                  }</span>
                  </div>
                  <div class="col s2 center-align">
                    VS
                  </div>
                  <div class="col s5 truncate center-align">
                  <span class="white-text text-darken-2">  ${
                    match[i].awayTeam.name
                  }</span>
                  </div>
                </div>
              </div>
              <div class="center-align"> 
              <b><a class="center-align grey darken-2 waves-effect waves-light btn btn-small" href="../pages/saved.html?id=${
                match[i].id
              }">Detail</a></b>
              </div>
          </div>
        </div>
      </div>
    `;
                i++;
              }
              document.getElementById("divMatches").innerHTML = dataMatchesHtml;
              resolve(data);
            });
          }
        });
    }

    fetch(
      "https://api.football-data.org/v2/competitions/2021/matches?status=SCHEDULED",
      {
        headers: {
          "X-Auth-Token": APIKEY
        }
      }
    )
      .then(response => {
        if (response.status !== 200) {
          console.log(response.status);
          return Promise.reject(new Error(response.statusText));
        } else {
          return Promise.resolve(response);
        }
      })
      .then(response => response.json())
      .then(function(data) {
        var dataMatchesHtml = "";
        var match = data.matches;
        var maxLoopData = match.length;
        var i = 0;
        // NOTE : Batasi Pertanding hanya 40 saja yang tampil
        if (match.length > 40) {
          maxLoopData = 40;
        }
        while (i < maxLoopData) {
          dataMatchesHtml += `
      <div class="col s12">
        <div class="card card-border grey darken-3 white-text">
          <div class="card-content">
            <div center-align>
              <div class="center-align" style="font-size: 20px !important;">${formatDate(
                new Date(match[i].utcDate)
              )}</div>
              <div class="row" style="margin:20px">
                <div class="col s5 truncate center-align">
                  <span class="white-text text-darken-2 flow-text">  ${
                    match[i].homeTeam.name
                  }</span>
                  </div>
                  <div class="col s2 center-align">
                    VS
                  </div>
                  <div class="col s5 truncate center-align">
                  <span class="white-text text-darken-2 flow-text">  ${
                    match[i].awayTeam.name
                  }</span>
                  </div>
                </div>
              </div>
              <div class="center-align"> 
              <b><a class="center-align grey darken-2 waves-effect waves-light btn btn-small" href="../pages/saved.html?id=${
                match[i].id
              }"><i class="far fa-eye" style="margin-right:5px;"></i> Check</a></b>
              </div>
          </div>
        </div>
      </div>
    `;
          i++;
        }
        document.getElementById("divMatches").innerHTML = dataMatchesHtml;
        resolve(data);
      })
      .catch(error => console.log(error));
  });
}

// NOTE : Fetch jadwal detail jadwal berdasarkan ID
function getDetailMatchById() {
  return new Promise(function(resolve, reject) {
    var string = new URLSearchParams(window.location.search);
    var idParam = string.get("id");
    if ("caches" in window) {
      caches
        .match("https://api.football-data.org/v2/matches/" + idParam)
        .then(function(response) {
          if (response) {
            response.json().then(function(data) {
              document.getElementById(
                "matchDay"
              ).innerHTML = `Matchday - ${data.match.matchday}`;
              document.getElementById("kickOff").innerHTML = `${formatDate(
                new Date(data.match.utcDate)
              )}`;
              document.getElementById("homeTeamName").innerHTML =
                data.match.homeTeam.name;
              document.getElementById("awayTeamName").innerHTML =
                data.match.awayTeam.name;

              document.getElementById(
                "numberOfMatches"
              ).innerHTML = `Total Matches: ${data.head2head.numberOfMatches}`;
              document.getElementById(
                "totalGoals"
              ).innerHTML = `Total Goals: ${data.head2head.totalGoals}`;
              document.getElementById("homeTeamWins").innerHTML =
                data.head2head.homeTeam.wins;
              document.getElementById("awayTeamWins").innerHTML =
                data.head2head.awayTeam.wins;
              document.getElementById("homeTeamDraws").innerHTML =
                data.head2head.homeTeam.draws;
              document.getElementById("awayTeamDraws").innerHTML =
                data.head2head.awayTeam.draws;
              document.getElementById("homeTeamLosses").innerHTML =
                data.head2head.homeTeam.losses;
              document.getElementById("awayTeamLosses").innerHTML =
                data.head2head.awayTeam.losses;
              document.getElementById("venue").innerHTML = data.match.venue;
              resolve(data);
            });
          }
        });
    }
    fetch("https://api.football-data.org/v2/matches/" + idParam, {
      headers: {
        "X-Auth-Token": APIKEY
      }
    })
      .then(response => {
        if (response.status !== 200) {
          console.log(response.status);
          return Promise.reject(new Error(response.statusText));
        } else {
          return Promise.resolve(response);
        }
      })
      .then(response => response.json())
      .then(function(data) {
        document.getElementById(
          "matchDay"
        ).innerHTML = `Matchday - ${data.match.matchday}`;
        document.getElementById("kickOff").innerHTML = `${formatDate(
          new Date(data.match.utcDate)
        )}`;
        document.getElementById("homeTeamName").innerHTML =
          data.match.homeTeam.name;
        document.getElementById("awayTeamName").innerHTML =
          data.match.awayTeam.name;

        document.getElementById(
          "numberOfMatches"
        ).innerHTML = `Total Matches: ${data.head2head.numberOfMatches}`;
        document.getElementById(
          "totalGoals"
        ).innerHTML = `Total Goals: ${data.head2head.totalGoals}`;
        document.getElementById("homeTeamWins").innerHTML =
          data.head2head.homeTeam.wins;
        document.getElementById("awayTeamWins").innerHTML =
          data.head2head.awayTeam.wins;
        document.getElementById("homeTeamDraws").innerHTML =
          data.head2head.homeTeam.draws;
        document.getElementById("awayTeamDraws").innerHTML =
          data.head2head.awayTeam.draws;
        document.getElementById("homeTeamLosses").innerHTML =
          data.head2head.homeTeam.losses;
        document.getElementById("awayTeamLosses").innerHTML =
          data.head2head.awayTeam.losses;
        document.getElementById("venue").innerHTML = data.match.venue;
        resolve(data);
      })
      .catch(error => console.log(error));
  });
}

function memory(data) {
  var dataMatchFavHtml = "";
  data.forEach(match => {
    dataMatchFavHtml += `
      <div class="col s12 m6 l6">
        <div class="card card-border grey darken-3 white-text">
          <div class="card-content">
            <div center-align>
            <div class="center-align">${formatDate(
              new Date(match.match.utcDate)
            )}
            </div>
            <div class="row" style="margin:20px">
              <div class="col s5 truncate right-align">
                <span class="white-text text-darken-2">  ${
                  match.match.homeTeam.name
                }</span>
              </div>
              <div class="col s2">
                VS
              </div>
              <div class="col s5 truncate left-align">
                <span class="white-text text-darken-2">  ${
                  match.match.awayTeam.name
                }</span>
              </div>
            </div>    
            <div class="center-align">
              <a class="grey darken-2 waves-effect waves-light btn" href="../pages/saved.html?id=${
                match.id
              }"><i class="far fa-eye" style="margin-right:5px;"></i> Check</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
  });
  document.getElementById("divSaved").innerHTML = dataMatchFavHtml;
}

// INDEXED DB
// NOTE : Ambil Data jadwal jadwal yang sudah disave
// Nantinya akan dilempar di saved.html
function getSavedDataById(dataType) {
  var string = new URLSearchParams(window.location.search);
  var idParam = Number(string.get("id"));
  if (dataType == "jadwal") {
    takeBundle("savedMatch", idParam).then(match => {
      document.getElementById(
        "matchDay"
      ).innerHTML = `Matchday - ${match.match.matchday}`;
      document.getElementById("kickOff").innerHTML = `${formatDate(
        new Date(match.match.utcDate)
      )}`;
      document.getElementById("homeTeamName").innerHTML =
        match.match.homeTeam.name;
      document.getElementById("awayTeamName").innerHTML =
        match.match.awayTeam.name;
      document.getElementById(
        "numberOfMatches"
      ).innerHTML = `Total Matches: ${match.head2head.numberOfMatches}`;
      document.getElementById(
        "totalGoals"
      ).innerHTML = `Total Goals: ${match.head2head.totalGoals}`;
      document.getElementById("homeTeamWins").innerHTML =
        match.head2head.homeTeam.wins;
      document.getElementById("awayTeamWins").innerHTML =
        match.head2head.awayTeam.wins;
      document.getElementById("homeTeamDraws").innerHTML =
        match.head2head.homeTeam.draws;
      document.getElementById("awayTeamDraws").innerHTML =
        match.head2head.awayTeam.draws;
      document.getElementById("homeTeamLosses").innerHTML =
        match.head2head.homeTeam.losses;
      document.getElementById("awayTeamLosses").innerHTML =
        match.head2head.awayTeam.losses;
      document.getElementById("venue").innerHTML = match.match.venue;
    });
  }
}

// NOTE : Fungsi untuk delete data yang sudah disave
function remove(bundle, data) {
  connection(idb)
    .then(db => {
      var flow = db.transaction(bundle, "readwrite");
      var dump = flow.objectStore(bundle);
      dump.delete(data);
      return flow.complete;
    })
    .then(() => {
      document.getElementById("iconFav").innerHTML = "UnFavorite";
      var removeTips =
        "<span class='pulse yellow-text center-align'>Remove</span>";
      M.toast({
        html: removeTips,
        displayLength: 2000,
        inDuration: 300,
        outDuration: 375,
        classes: "rounded",
        completeCallback: function() {
          alert("Sucesfully Remove From Memory");
        }
      });
    })
    .catch(error => console.log(error));
}

// NOTE: validasi data favorit atau bukan
function validation(bundle, id) {
  return new Promise((resolve, reject) => {
    connection(idb)
      .then(db => {
        var flow = db.transaction(bundle, "readonly");
        var dump = flow.objectStore(bundle);
        return dump.get(id);
      })
      .then(data => {
        if (data != undefined) {
          resolve("Your favorite match");
        } else {
          reject("Not Your favorite");
        }
      })
      .then(err => {
        console.log("Validation Failed", err);
      });
  });
}

// NOTE : Tampung jadwal yang ketika menekan save/allSave
function push(dataType, data) {
  var bundle = "";
  var targetBundle = {};
  if (dataType == "jadwal") {
    bundle = "savedMatch";
    targetBundle = {
      id: data.match.id,
      head2head: {
        numberOfMatches: data.head2head.numberOfMatches,
        totalGoals: data.head2head.totalGoals,
        homeTeam: {
          wins: data.head2head.homeTeam.wins,
          draws: data.head2head.homeTeam.draws,
          losses: data.head2head.homeTeam.losses
        },
        awayTeam: {
          wins: data.head2head.awayTeam.wins,
          draws: data.head2head.awayTeam.draws,
          losses: data.head2head.awayTeam.losses
        }
      },
      match: {
        utcDate: data.match.utcDate,
        venue: data.match.venue,
        matchday: data.match.matchday,
        homeTeam: {
          name: data.match.homeTeam.name
        },
        awayTeam: {
          name: data.match.awayTeam.name
        }
      }
    };
  }
  connection(idb)
    .then(db => {
      const flow = db.transaction(bundle, "readwrite");
      flow.objectStore(bundle).put(targetBundle);
      return flow.complete;
    })
    .then(() => {
      document.getElementById("iconFav").innerHTML = "favorite";
      var successTips =
        "<span class='pulse yellow-text center-align'>Save</span>";
      M.toast({
        html: successTips,
        displayLength: 2000,
        inDuration: 300,
        outDuration: 375,
        classes: "rounded",
        completeCallback: function() {
          alert("Sucesfully Save To Database");
        }
      });
    })
    .catch(err => console.log(err));
}

function takeBundle(bundle, id) {
  return new Promise(resolve => {
    connection(idb)
      .then(db => {
        var flow = db.transaction(bundle, "readonly");
        var dump = flow.objectStore(bundle);
        return dump.get(id);
      })
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        console.log("Failed : ", err);
      });
  });
}

function getAll(bundle) {
  return new Promise(resolve => {
    connection(idb)
      .then(db => {
        var flow = db.transaction(bundle, "readonly");
        var dump = flow.objectStore(bundle);
        return dump.getAll();
      })
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        console.log("Get All Failed", err);
      });
  });
}

function grab(dataType) {
  if (dataType == "jadwal") {
    getAll("savedMatch").then(data => {
      memory(data);
    });
  }
}

// DATABASEJS
function connection(idb) {
  var dbPromise = idb.open("football-faeshal", 1, function(upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains("savedMatch")) {
      var targetBundle = upgradeDb.createObjectStore("savedMatch", {
        keyPath: "id"
      });
      targetBundle.createIndex("TeamHome", "match.homeTeam.name", {
        unique: false
      });
      targetBundle.createIndex("TeamAway", "match.awayTeam.name", {
        unique: false
      });
    }
  });

  return dbPromise;
}
