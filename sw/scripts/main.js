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

            subscribe();
        })
        .catch(function (error) {
            console.error("Service Worker Error", error);
        });
} else {
    console.warn("Push messaging is not supported");
}

function subscribe() {
    const applicationServerKey = urlB64ToUint8Array(publicKey);

    const options = { userVisibleOnly: true, applicationServerKey: applicationServerKey };
    swRegistration.pushManager.subscribe(options)
        .then(function (subscription) {
            console.log('User is subscribed.');

            registerOnServer(subscription);

            isSubscribed = true;
        })
        .catch(function (err) {
            console.log('Failed to subscribe the user: ', err);
        });
}

function unsubscribe() {
    swRegistration.pushManager.getSubscription()
        .then(function (subscription) {
            if (subscription) {
                return subscription.unsubscribe();
            }
        })
        .catch(function (error) {
            console.log('Error unsubscribing', error);
        })
        .then(function () {
            registerOnServer(null);

            console.log('User is unsubscribed.');
            isSubscribed = false;
        });
}

function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
}

function registerOnServer(subscription) {
    if (subscription) {
        // initial registration or update...
    } else {
        // unregistration...
    }
}
