// request functions - invoke device actions by means of url redirection...


/**
 * Registers the given user identifier with the native mobile application.
 * The user id is expected to be the user principal name (UPN): e.g., user@loopsoftware.fr.
 * @param userId - user's id in UPN form
 */
function registerUser(userId: string) {
    document.location.replace(`loop://register?userId=${userId}`);
}

/**
 * Clears all user data and unregisters the user with Azure Notification Hubs.
 * The user id is expected to be the user principal name (UPN): e.g., user@loopsoftware.fr.
 * @param userId - user's id in UPN form
 */
function unregisterUser(userId: string) {
    document.location.replace(`loop://unregister?userId=${userId}`);
}

/**
 * Requests the device to authorise the user via TouchID (iOS) or fingerprint sensor (Android).
 * The result of the fingerprint scan is provide via the function handleFingerprintResult().
 */
function getFingerprintAuthorisation() {
    document.location.replace("loop://fingerprint");
}

/**
 * Requests access to the camera application.
 * (Android only.)
 */
function getCameraCapture() {
    document.location.replace("loop://camera");
}


// response function - must be global so that device can access them from outside the webview...


/**
 * Receives the capabilities of the device.
 * @param capabilities - device capabailities
 */
function handleDeviceCapabilities(capabilities) {
    if (capabilities.html5Camera) {
        // use html5 camera capture to get photos...
    } else {
        // use the getCameraCapture() function to request the device to take use camera...
    }
}

/**
 * Receives the result of TouchID (iOS) or fingerprint sensor (Android).
 * @param result - the result of the fingerprint authorisation request
 */
function handleFingerprintResult(result: string) {
    switch (result) {
        case "success":
            // successful fingerprint scan...
            break;

        case "fail":
            // the fingerprint wasn't recognised...
            break;

        case "not-available":
            // the fingerprint scanner isn't available or configured...
            break;

        case "user-cancel":
            // the user cancelled the fingerprint scan...
            break;

        case "system-cancel":
            // the fingerprint scan was cancelled by the system...
            break;

        default:
            // anything else is a failure...
            break;
    }
}

/**
 * Receives the result from the user's camera usage.
 * @param result - image taken by the camera, in Data URI format
 */
function handleCameraResult(result: string) {
    switch (result) {
        case "no-camera":
            break;

        case "user-cancel":
            break;

        default:
            const imageUri = result;
            break;
    }
}
