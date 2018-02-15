"use strict";

self.addEventListener("install", event => {
    console.log("service worker >> installed!");
    event.waitUntil(self.skipWaiting());
});


self.addEventListener('activate', event => {
    console.log("service worker >> activated!");
    event.waitUntil(self.clients.claim());
});
