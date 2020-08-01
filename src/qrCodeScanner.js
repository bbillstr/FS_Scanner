//Init app
qrcode = window.qrcode;
const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");
var data;
var data2;
var id;
let scanning = false;

//QR Response Data
 qrcode.callback =  function (res) {
    data = res;
    id = data;
    console.log(id);
    console.log("Data1  "+data);
    sendId();
    scanning = true;
    };

//Refresh page after form submit
function autoRefresh () {
  window.reload();
}

 
function sendId () {
   $('#field96347095').val(data);
   setTimeout(function() {
   sendTestId();
  }, 3000);
}

function sendTestId () {
  tick();
  scan();
  qrcode.callback =  function (res) {
    data2 = res;
    console.log("Data2  "+data2);
    scanning = true;
    $('#field96347098').val(data2);
    isNull();
    };
 
}

function isNull () {
  var checkNull = $('#field96347098').val(); 
    if (checkNull !== "") {
      document.getElementById('fsSubmitButton3989520').click();
  }
 };

// Camera Canvas Init
window.onload = function cameraStart () {
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


$('#field96347095').keyup(function() {
 id=$('#field96347095').val();
 console.log(id);
});

$('#field96347095').change(function() {
var settings = {
  "url": "https://cors-anywhere.herokuapp.com/https://www.formstack.com/api/v2//submission/"+id+".json",
  "method": "GET",
  "timeout": 0,
  "headers": {
    "Authorization": "Bearer 12cdf45b77d76ccf45ffe8a087a8b031"
  },
};

$.ajax(settings).done(function (response) {
  console.log(response);

  var fname = (response.data[0].value);
  fname = fname.split("first = ").pop();
  fname = fname.split("last").shift();
  console.log(fname);

  var lname = (response.data[0].value);
  lname = lname.split("last = ").pop();
  console.log(lname);
  $('#field96347096').val(fname + " " + lname);

  var email = (response.data[1].value)
  console.log(email);
  $('#field96347097').val(email);


});
});
