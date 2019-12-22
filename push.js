var webPush = require("web-push");
const vapidKeys = {
  publicKey:
    "BJsotfBBigWThrzhc4jG3Fx2EVHu8oDXPH88MsOI4DVf9b2pQ-vOZXa4z0QNz0Mggbq8RgyeNAN7U3Pk_fwWHEY",
  privateKey: "OOoBmGQRyxuTi0mTpmfFhcLmM2_a9PrquRj-4qsgfkE"
};

webPush.setVapidDetails(
  "mailto:faeshal111@gmail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);
var pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/eO4gG7ikjqk:APA91bGtVOI-6CWerWfn-ph4C8-oh9s4eJP8DGX_FitcYd9g2Wu_ikTRz-tWiB1RYdyO8KN4iCWiuIasZpxIzvF-KGX8d7hPB7KH9XXohqWKDTmJE7oVgE-MxrBdAp-jj8umhhOOJZo7",
  keys: {
    p256dh:
      "BME9egq9B10SvRuIPhk680wk033C8pZos2JlLFl4KT7w6yz2zJsMRct/UBKy6wPvrFoQRPQC/E3RHnj5wlreYyM=",
    auth: "ypmcj9xevhTkbTWEKpZN/Q=="
  }
};
var payload = "Selamat! Aplikasi Berhasil menerima Push notifikasi!";
var options = {
  gcmAPIKey: "291863375655",
  TTL: 60
};
webPush.sendNotification(pushSubscription, payload, options);
