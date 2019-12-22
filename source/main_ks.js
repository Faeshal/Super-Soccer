var webpush = require('web-push');

var pushSubscription = {
    "endpoint" : "https://android.googleapis.com/gcm/send/dxuxCfDAD5M:APA91bGhy1QbcFv-Lu1D0g6K0tn0wiOJ5s2o64RPi2MRG8siH9jgQqSkj2BVYiZYj8wYhsTU1pWunYsyjhyTMcvNHEdAm0Bf_EkybNZQ9hOO30VXLOXdwHlcsnqb1Hfvz58UtCrymdUU",
    "keys" : {
        "p256dh" : "BIpowLkQ8/aSsHFxNTKcHqN9lQgPJfMjtJxO2lDjfCFHXD3KlvirEguCoP/V7FittkTiRd/wZ+u/g7+s4ZnP6Ew=",
        "auth" : "9DcJQZ38Hfqwo4dRHOf6Wg=="
    }
};

var payload = "Here is a payload!";

var options = {
    gcmAPIKey: 'AAAAGByFHlo:APA91bHONY1xbQzPxD-Ed4ndwBbviesb6TuaIdZHJzsRP6TZlrdN4K6BaRtgdI6l9UptvCw2qJR4bKTfyIsbhsZkes8f6QkvL7r647nOW8770-lOWQjknyiKcc8bXNfiCHjo0ljmFNos',
    TTL: 60
};

webpush.sendNotification(
    pushSubscription,
    payload,
    options
).catch(function (err) {
    console.log(err)
});