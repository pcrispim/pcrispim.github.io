"use strict";

function setUserAgent() {
    document.getElementById("agent").innerHTML = navigator.userAgent;
}

function loginUser() {
    const userId = "pedro@loopsoftware.fr";
    document.location.replace(`loop://register?userId=${userId}`);
}

function handleDeviceCapabilities(capabilities) {
    if (capabilities.html5Camera === false) {
        // use the getCameraCapture() function to request the device to take use camera...
        alert("cannot use html5 camera...");
    } else {
        // use html5 camera capture to get photos...
        alert("can use html5 camera!");
    }

    // if (capabilities.html5Camera === true) {
    //     // use html5 camera capture to get photos...
    //     alert("can use html5 camera!");
    // } else {
    //     // use the getCameraCapture() function to request the device to take use camera...
    //     alert("cannot use html5 camera...");
    // }
}

function logoutUser() {
    const userId = "pedro@loopsoftware.fr";
    document.location.replace(`loop://unregister?userId=${userId}`);
}

function authoriseUser() {
    document.location.replace("loop://fingerprint");
}

function handleFingerprintResult(success) {
    alert("fingerprint scan: " + success);
}

function handleNotification(notification) {
    alert(notification.subject + ": " + notification.body);
}

function getCamera() {
    // navigator.mediaDevices.getUserMedia({ video: true })
    //     .then(gotMedia)
    //     .catch(error => console.error('getUserMedia() error:', error));
    document.location.replace("loop://camera");
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

window.URL = window.URL || window.webkitURL;

var fileSelect = document.getElementById("fileSelect"),
    fileElem = document.getElementById("fileElem"),
    fileList = document.getElementById("fileList");

fileSelect.addEventListener("click", function (e) {
    if (fileElem) {
        fileElem.click();
    }
    e.preventDefault(); // prevent navigation to "#"
}, false);

function handleFiles(files) {
    if (!files.length) {
        fileList.innerHTML = "<p>No files selected!</p>";
    } else {
        fileList.innerHTML = "";
        var list = document.createElement("ul");
        fileList.appendChild(list);
        for (var i = 0; i < files.length; i++) {
            var li = document.createElement("li");
            list.appendChild(li);

            var img = document.createElement("img");
            img.src = window.URL.createObjectURL(files[i]);
            img.height = 60;
            img.onload = function () {
                window.URL.revokeObjectURL(this.src);
            }
            li.appendChild(img);
            var info = document.createElement("span");
            info.innerHTML = files[i].name + ": " + files[i].size + " bytes";
            li.appendChild(info);
        }
    }
}

function handleCameraResult(imgBase64) {
    switch (result) {
        case "no-camera":
            alert("no camera!");
            break;

        case "user-cancel":
            alert("user cancelled...");
            break;

        default:
            alert("received image...");
            showImage(imgBase64)
            break;
    }
}

function showImage(imgBase64) {
    const image = new Image();
    image.onload = () => {
        const canvas = document.querySelector("#photoCanvas");
        const context = canvas.getContext("2d");

        context.drawImage(image, 0, 0, 800, 600);
    };

    image.src = imgBase64;
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
