"use strict";

const publicKey = "BD3bVDccYiQRNV1S31iXxA1clzBGvlRknP2yvYwKMRyu4bt4ObTc0fvI0XrP6FBy8T8ldFIGY3N-aRBSqqhIZ5M";

let swRegistration = null;
let isSubscribed = false;

if ("serviceWorker" in navigator && "PushManager" in window) {
    console.log("Service Worker and Push is supported");

    navigator.serviceWorker.register("sw.js")
        .then(function (swReg) {
            console.log("Service Worker is registered", swReg);

            swRegistration = swReg;

            register();
        })
        .catch(function (error) {
            console.error("Service Worker Error", error);
        });
} else {
    console.warn("Push messaging is not supported");
}

function register() {
    if (!swRegistration) {
        throw new Error("Service worker not registered!");
    }

    return swRegistration.pushManager.getSubscription()
        .then(function (subscription) {
            isSubscribed = !(subscription === null);

            // TODO: register to server...

            if (isSubscribed) {
                console.log('User IS subscribed.');
            } else {
                console.log('User is NOT subscribed.');
            }
        });
}
