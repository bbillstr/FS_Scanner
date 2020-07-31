//Init app
qrcode = window.qrcode;
const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");
var data;
var data2;
let scanning = false;

//QR Response Data
 qrcode.callback = function (res) {
  if (res) {
    data = res;
    console.log("Data1  "+data);
    sendTestId();
    scanning = true;  
    setTimeout(autoRefresh, 1000)
     }
    };

//Refresh page after form submit
function autoRefresh () {
  location.reload();
}

//Send Submission ID to iFrame
function sendSubmissionId () {
  var destination1 = document.getElementById("iframe").contentWindow;
    destination1.postMessage(data,'*');
}

//Send Test ID to iFrame
function sendTestId () {
  var destination2 = document.getElementById("iframe").contentWindow;
    destination2.postMessage(data,'*');
}

// Camera Canvas Init
window.onload = function() {
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then(function(stream) {
      scanning = true;
      canvasElement.hidden = false;
      video.setAttribute("playsinline", true); 
      video.srcObject = stream;
      video.play();
      tick();
      scan();
    });
};

//Camera Frame Logging
function tick() {
  canvasElement.height = video.videoHeight;
  canvasElement.width = video.videoWidth;
  canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
  scanning && requestAnimationFrame(tick);
}

//Camera QR Scanning - pass res to QR callback
function scan() {
  try {
    qrcode.decode();
  } catch (e) {
    setTimeout(scan, 300);
  }
}
