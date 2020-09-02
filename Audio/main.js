const audio = document.querySelector('audio');

const constrains = window.constrains = {
    audio : true,
    video : false
}

function handleSuccess(stream){
    const audioTracks = stream.getAudioTracks();
    console.log('Using audio devices', audioTracks[0].label);
    stream.oninactive = function(){
        console.log('Stream ended');
    }
    window.stream = stream;
    audio.srcObject = stream;
}

function handleError(error){
    console.log(error)
}

navigator.mediaDevices.getUserMedia(constrains).then(handleSuccess).catch(handleError)
