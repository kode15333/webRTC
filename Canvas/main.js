const video = document.querySelector('video');
const canvas = document.querySelector('canvas');
canvas.width = 500;
canvas.height = 500;

const button = document.querySelector('button');
button.onclick = function(){
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
}

const constraints = {
    audio : false,
    video : true,
}

function handleSucess(stream){
    window.stream = stream;
    video.srcObject = stream;
}

function handleError(error){
    console.log(error.message, error.name)
}

navigator.mediaDevices.getUserMedia(constraints).then(handleSucess).catch(handleError)
