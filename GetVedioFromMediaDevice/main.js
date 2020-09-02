const constraints = window.constraints = {
    audio: false,
    video: true,
}

function handleSuccess(stream) {
    const video = document.querySelector('video')
    const videoTracks = stream.getVideoTracks();
    console.log('Got stream with constraints', constraints)
    console.log('Using video devices', videoTracks)
    window.stream = stream;
    video.srcObject = stream;
}

function handleError(error) {
    if (error.name === 'ConstrainNotSatisfiedError') {
        const v = constraints.video;
        errorMsg(`The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`);
    } else if (error.name === 'PermissionDeniedError') {
        errorMsg('Permission have not been granted to use your camera and '
            + 'microphone, you need to allow the page access to your devices in'
            + 'order for the demo th work.')
    }
    errorMsg(`getUserMedia error: + ${error.name}`, error);
}
function errorMsg(msg, error) {
    console.log(msg, error);
}

async function init(e){
    try{
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        handleSuccess(stream);
        e.target.disabled = true;
    } catch (e) {
        handleError(e);
    }
}

document.querySelector('#showVideo').addEventListener('click', e => init(e))
