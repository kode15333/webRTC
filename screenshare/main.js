function handleError(error) {
    errorMsg(`getDisplayMedia error: ${error.name}`, error);
}
function errorMsg(msg, error) {
    const errorElement = document.querySelector('#errorMsg');
    errorElement.innerHTML += `<p>${msg}</p>`;
    if (typeof error !== 'undefined') {
        console.error(error);
    }
}
function handleSuccess(stream){
    startButton.disabled = true;
    const video = document.querySelector('video');
    video.srcObject = stream;

    stream.getVideoTracks()[0].addEventListener('ended', () => {
        startButton.disabled = false;
    })
}


const startButton = document.querySelector('#startButton');
startButton.addEventListener('click', () => {
    navigator.getDisplayMedia({video : true}).then(handleSuccess).catch(handleError)
})

if ((navigator.mediaDevices && 'getDisplayMedia' in navigator.mediaDevices)) {
    startButton.disabled = false;
} else {
    errorMsg('getDisplayMedia is not supported');
}

