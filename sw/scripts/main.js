"use strict";

let swRegistration = null;

if ("serviceWorker" in navigator && "PushManager" in window) {
    console.log("Service Worker and Push is supported");

    navigator.serviceWorker.register("scripts/sw.js")
        .then(function (swReg) {
            console.log("Service Worker is registered", swReg);

            swRegistration = swReg;
        })
        .catch(function (error) {
            console.error("Service Worker Error", error);
        });
} else {
    console.warn("Push messaging is not supported");
}
