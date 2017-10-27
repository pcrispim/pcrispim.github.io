"use strict";

function setUserAgent() {
    document.getElementById("agent").innerHTML = navigator.userAgent;
}

function loginUser() {
    document.location.replace("loop://login?userId=pedro@loopsoftware.fr");
}

function logoutUser() {
    document.location.replace("loop://logout?userId=pedro@loopsoftware.fr");
}

function authoriseUser() {
    document.location.replace("loop://authorisation");
}

function handleAuthorisation(success) {
    alert("fingerprint scan: " + success);
}

function handleNotification(notification) {
    alert(notification.subject + ": " + notification.body);
}

function getCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(gotMedia)
        .catch(error => console.error('getUserMedia() error:', error));
}

function gotMedia(mediaStream) {
    const mediaStreamTrack = mediaStream.getVideoTracks()[0];
    const imageCapture = new ImageCapture(mediaStreamTrack);
    imageCapture.takePhoto()
        .then(blob => createImageBitmap(blob))
        .then(imageBitmap => {
            const canvas = document.querySelector("#photoCanvas");
            drawCanvas(canvas, imageBitmap);
        })
        .catch(error => console.error("gotMedia() error: ", error));
    console.log(imageCapture);
}

function drawCanvas(canvas, img) {
    canvas.width = getComputedStyle(canvas).width.split('px')[0];
    canvas.height = getComputedStyle(canvas).height.split('px')[0];
    let ratio = Math.min(canvas.width / img.width, canvas.height / img.height);
    let x = (canvas.width - img.width * ratio) / 2;
    let y = (canvas.height - img.height * ratio) / 2;
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height, x, y, img.width * ratio, img.height * ratio);
}

function handleFileSelect(evt) {
    const files = evt.target.files; // FileList object

    // files is a FileList of File objects. List some properties.
    const output = [];
    for (let i = 0, f; f = files[i]; i++) {
        output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ')<br/>',
            f.size, ' bytes<br/>last modified: ',
            f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
            `<br/><img id="${escape(f.name)}" src="" alt="${escape(f.name)}" style="width:200px"/><br/>`,
            '</li>');
    }
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';

    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = event => {
            document.getElementById(escape(file.name)).src = event.target.result;
        };
        reader.readAsDataURL(file);
    });
}

document.getElementById('files').addEventListener('change', handleFileSelect, false);
