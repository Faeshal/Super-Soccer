// NOTE : Workbox via CDN versi terbaru
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
);

//NOTE : Validasi apakah workbox berhasil diload
// kalau berhasil maka lanjut simpan aset utama (Precaching)
// & lakukan workbox strategi
if (workbox) {
  console.log("Workbox Succesfully Load");
  workbox.precaching.precacheAndRoute([
    {
      url: "/",
      revision: "3"
    },
    {
      url: "/nav.html",
      revision: "3"
    },
    {
      url: "/index.html",
      revision: "3"
    },
    {
      url: "/pages/saved.html",
      revision: "3"
    },
    {
      url: "/pages/about.html",
      revision: "3"
    },
    {
      url: "/pages/allSave.html",
      revision: "3"
    },
    {
      url: "/pages/standing.html",
      revision: "3"
    },
    {
      url: "/pages/matches.html",
      revision: "3"
    },
    {
      url: "/css/custom.css",
      revision: "3"
    },
    {
      url: "/css/materialize.min.css",
      revision: "3"
    },
    {
      url: "/js/req.js",
      revision: "3"
    },
    {
      url: "/js/idb.js",
      revision: "3"
    },
    {
      url: "/js/materialize.min.js",
      revision: "3"
    },
    {
      url: "/js/link.js",
      revision: "3"
    },
    {
      url: "/js/jquery-3.3.1.js",
      revision: "3"
    },
    {
      url: "/js/load.js",
      revision: "3"
    },
    {
      url: "/image/bell.png",
      revision: "3"
    },
    {
      url: "/image/f128.png",
      revision: "3"
    },
    {
      url: "/image/f256.png",
      revision: "3"
    },
    {
      url: "/image/f512.png",
      revision: "3"
    },
    {
      url: "/gif/epl.gif",
      revision: "3"
    },
    {
      url: "/gif/versus.gif",
      revision: "3"
    }
  ]);

  // SECTION : WorkBox Strategi - cache semua file gambar dengan ektensi dibawah
  // selama 30hari
  workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
      cacheName: "images",
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60
        })
      ]
    })
  );

  // NOTE : staleWhileRevalidate : semua asset akan dikembalikan secepatnya
  // sambil teruskan request ke network untuk mengupdate cache yang akan dipakai pada request berikutnya
  workbox.routing.registerRoute(
    new RegExp("https://api.football-data.org/v2/"),
    workbox.strategies.staleWhileRevalidate()
  );

  workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: "google-fonts-stylesheets"
    })
  );

  //NOTE: Menyimpan cache untuk file font selama 1 tahun
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    workbox.strategies.cacheFirst({
      cacheName: "google-fonts-webfonts",
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200]
        }),
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 365,
          maxEntries: 30
        })
      ]
    })
  );

  // NOTE : Simpan semua file yang ada dalam folder pages
  workbox.routing.registerRoute(
    new RegExp("/pages/"),
    workbox.strategies.staleWhileRevalidate({
      cacheName: "pages"
    })
  );

  //NOTE : cache first : semua aset akan diambil dari dalam cache.
  // kalau ga ada , maka lakukan request lewat jaringan
  workbox.routing.registerRoute(
    new RegExp("/js/"),
    workbox.strategies.cacheFirst()
  );

  workbox.routing.registerRoute(
    new RegExp("/css/"),
    workbox.strategies.cacheFirst()
  );
} else {
  // NOTE : Tampilkan pesan ke console jika ada kesalahan
  console.log("Workbox Failed to Load");
}

// NOTE : Event Push notification
self.addEventListener("push", function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }
  var options = {
    body: body,
    icon: "image/bell.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});
