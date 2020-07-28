qrcode = window.qrcode;
const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");
const qrResult = document.getElementById("qr-result");
const outputData = document.getElementById("outputData");
const btnScanQR = document.getElementById("btn-scan-qr");
var data;
var data2;
let scanning = false;
btnScanQR.hidden=true;

 qrcode.callback = res => {
  if (res) {
    data = res;
    console.log("Data1  "+data);
    sendTestId();
    scanning = true;  
    setTimeout(autoRefresh, 1000)
     }
    };

function autoRefresh () {
  location.reload();
}

function sendSubmissionId () {
  var destination1 = document.getElementById("iframe").contentWindow;
    destination1.postMessage(data,'*');
}

function sendTestId () {
  var destination2 = document.getElementById("iframe").contentWindow;
    destination2.postMessage(data,'*');
}

window.onload = function() {
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then(function(stream) {
      scanning = true;
      qrResult.hidden = true;
      btnScanQR.hidden = true;
      canvasElement.hidden = false;
      video.setAttribute("playsinline", true); 
      video.srcObject = stream;
      video.play();
      tick();
      scan();
    });
};

function tick() {
  canvasElement.height = video.videoHeight;
  canvasElement.width = video.videoWidth;
  canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
  scanning && requestAnimationFrame(tick);
}

function scan() {
  try {
    qrcode.decode();
  } catch (e) {
    setTimeout(scan, 300);
  }
}
