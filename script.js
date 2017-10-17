"use strict";

function registerForNotifications() {
    document.location.replace("loop://notifications?tag=pedro@loopsoftware.fr");
}

function requestIdentification() {
    document.location.replace("loop://authorisation");
}

function handleIdentificationResult(success) {
    alert("figerprint scan: " + success);
}

function handleNotifications(notification) {
    alert(notification.subject);
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
