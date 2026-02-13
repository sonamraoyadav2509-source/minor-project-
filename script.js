let stream;

function openCameraModal() {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("cameraModal").style.display = "block";

    navigator.mediaDevices.getUserMedia({ video: true })
        .then(s => {
            stream = s;
            document.getElementById("video").srcObject = stream;
        })
        .catch(() => {
            alert("Camera access denied");
        });
}

function closeCameraModal() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("cameraModal").style.display = "none";

    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
}


// capture photo
const snapbtn = document.getElementById("snap");
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");

snapbtn.addEventListener("click", () => {
    const context = canvas.getContext("2d");

    // set canvas size same as video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // draw current video frame onto canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // show canvas after capture
    canvas.style.display = "block";
});